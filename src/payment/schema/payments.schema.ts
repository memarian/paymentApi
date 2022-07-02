import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PaymentsDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  planId: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
