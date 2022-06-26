import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class VerifyAuthDto extends PartialType(CreateAuthDto) {
  @IsNumber()
  code: number;
}
