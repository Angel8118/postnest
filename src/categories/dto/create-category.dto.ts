import { IsString, IsNotEmpty } from "class-validator";
    
export class CreateCategoryDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    name: string;
}
