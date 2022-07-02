import { PaymentStatus } from 'src/payment/PaymentStatus.enum';

export interface IPaymentRes {
  status: PaymentStatus;
  code: number;
  url: string;
}
