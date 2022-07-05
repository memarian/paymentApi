import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class VerifyAuthDto extends PartialType(LoginAuthDto) {
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
