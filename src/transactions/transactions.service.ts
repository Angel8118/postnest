import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

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
      transaction.total = createTransactionDto.total;

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

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
