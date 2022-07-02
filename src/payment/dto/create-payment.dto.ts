import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @Type(() => Number)
  @IsNumber()
  planId: number;
}
