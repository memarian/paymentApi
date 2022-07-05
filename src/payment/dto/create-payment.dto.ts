import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  planId: number;
}
