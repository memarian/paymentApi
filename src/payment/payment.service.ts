import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJwtPayload } from 'src/auth/interfaces/jwt.payload.interface';
import { generateIntCode, getRandomUrl } from 'src/common/utils';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IPaymentRes } from './interfaces/paymentRes.interface';
import { PaymentStatus } from './PaymentStatus.enum';
import { Payment, PaymentsDocument } from './schema/payments.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentsDocument>,
  ) {}
  async create(userId: string, planId): Promise<IPaymentRes> {
    const payment = new this.paymentModel({
      planId,
      userId,
      code: generateIntCode(),
      url: getRandomUrl(),
    });

    await payment.save();

    return {
      status: PaymentStatus.ACCEPT,
      code: payment.code,
      url: payment.url,
    };
  }

  async findAll(currentUser: IJwtPayload) {}

  findUserById(id: string) {
    return '';
  }

  async findOne(userId: string, id: string): Promise<PaymentsDocument> {
    return await this.paymentModel.findOne({ userId });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
