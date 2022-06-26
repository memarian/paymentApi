import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
