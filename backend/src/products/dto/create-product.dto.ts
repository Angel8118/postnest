import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name is required' })
    @IsString({ message: 'Product name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Product price is required' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Product price must be a number' })
    price: number;

    @IsNotEmpty({ message: 'Inventory is required' })
    @IsNumber({maxDecimalPlaces: 0}, { message: 'Inventory must be a whole number' })
    inventory: number;

    @IsNotEmpty({ message: 'Category is required' })
    @IsInt({ message: 'Category must be a number' })
    categoryId: number;

}
