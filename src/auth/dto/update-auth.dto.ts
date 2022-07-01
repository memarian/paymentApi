import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class UpdateAuthDto extends PartialType(LoginAuthDto) {}
