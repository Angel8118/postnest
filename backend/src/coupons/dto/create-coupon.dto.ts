import { IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateCouponDto {

    @IsNotEmpty({ message: 'Name should not be empty' })   
    name: string;

    @IsNotEmpty({ message: 'Percentage should not be empty' })
    @IsInt({ message: 'Percentage must be between 1 and 100' })
    @Max(100, { message: 'Percentage must be between 1 and 100' })
    @Min(1, { message: 'Percentage must be between 1 and 100' })
    percentage: number;

    @IsNotEmpty({ message: 'Expiration date should not be empty' })
    @IsDateString({}, { message: 'Expiration date must be a valid date string' })
    expirationDate: Date;

}
