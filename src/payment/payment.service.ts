import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/guards/roles.enum';
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

  async findAll(currentUser: IJwtPayload) {
    let query;
    if (currentUser.role == Role.USER) query = { userId: currentUser.sub };
    return await this.paymentModel.find(query).lean();
  }

  async findOne(userId: string, id: string): Promise<PaymentsDocument> {
    return await this.paymentModel.findOne({ id, userId });
  }

  async update(id: string, userId: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(userId, id);
    // payment = {
    //   ...updatePaymentDto,
    // };
  }

  async remove(userId: string, id: string) {
    return await this.paymentModel.remove({ userId, _id: id });
  }
}
