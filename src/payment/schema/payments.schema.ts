import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PaymentsDocument = Payments & Document;

@Schema()
export class Payments {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payments);
