import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { start } from 'repl';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
  ) { }


  async create(createTransactionDto: CreateTransactionDto) {

    await this.productsRepository.manager.transaction(async (transactionEntityManager) => {
      const transaction = new Transaction();
      transaction.total = createTransactionDto.contents.reduce((total, item) => total + (item.price * item.quantity), 0);

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId } );
        
        const errors: string[] = [];

        if (!product) {
          errors.push(`Product with id ${contents.productId} not found`);
          throw new NotFoundException(errors);
        } 
        if (contents.quantity > product.inventory) {
          errors.push(`Insufficient inventory for product with id ${contents.productId}`);
          throw new BadRequestException(errors);
        }

        product.inventory -= contents.quantity;

        //Create transaction contents instance 
        const transactionContent = new TransactionContents();
        transactionContent.price = contents.price;
        transactionContent.product = product;
        transactionContent.quantity = contents.quantity;
        transactionContent.transaction = transaction;
        await transactionEntityManager.save(transaction);
        await transactionEntityManager.save(transactionContent);

        await transactionEntityManager.save(TransactionContents,{
          ...contents,
          transaction,
          product
        })
      }
    })



    return "Sale saved Successful";
  }

  findAll(transactionDate?: string) {
    const options : FindManyOptions<Transaction> = {
      relations: {
        contents: true
      }
    }
    if (transactionDate) {
      const date = parseISO(transactionDate);
      if(!isValid(date)) {
        throw new BadRequestException('Invalid date format');
      }
      const start = startOfDay(date);
      const end = endOfDay(start);

      options.where = {
        transactionDate: Between(start, end)
      }
    }
    return this.transactionsRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: {
        contents: true
      }
    })
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const content of transaction.contents) {
      const transactionContents = await this.transactionContentsRepository.findOneBy({id: content.id});
      if (transactionContents) {
        await this.transactionContentsRepository.remove(transactionContents);
      }
    }

    await this.transactionsRepository.remove(transaction);
    return `Transaction with id ${id} has been removed`;
  }
}
