import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
    
    @IsNotEmpty({ message: 'Coupon code must not be empty' })
    coupon_name: string;
}