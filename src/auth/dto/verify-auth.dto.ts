import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class VerifyAuthDto extends PartialType(LoginAuthDto) {
  @IsNumber()
  code: number;
}
