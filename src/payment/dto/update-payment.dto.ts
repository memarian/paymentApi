import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUrl } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNumber()
  @IsOptional()
  code: number;

  @IsNumber()
  @IsOptional()
  planId: number;

  @IsUrl()
  @IsOptional()
  url: string;
}
