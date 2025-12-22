import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
    @IsOptional()
    @IsNumberString({}, { message: 'category_id must be a number string' })
    category_id: number;

    @IsOptional()
    @IsNumberString({}, { message: 'page must be a number string' })
    take: number;

    @IsOptional()
    @IsNumberString({}, { message: 'skip must be a number string' })
    skip: number;
}