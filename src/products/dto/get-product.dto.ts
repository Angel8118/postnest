import { IsNumberString, IsOptional} from 'class-validator';

export class GetProductsQueryDto {
    @IsOptional()
    @IsNumberString({}, {message: 'category_id must be a number string' })
    category_id?: number;
}