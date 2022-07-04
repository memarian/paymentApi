import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsUrl } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNumber()
  code: number;

  @IsNumber()
  planId: number;

  @IsUrl()
  url: string;
}
