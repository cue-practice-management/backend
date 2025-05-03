import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@users/schemas/user.schema';
import { Document, Types } from 'mongoose';
import { OtpPurpose } from 'otp/enums/otp.enums';

@Schema({ timestamps: true })
export class Otp extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, enum: OtpPurpose })
  purpose: OtpPurpose;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  used: boolean;

  @Prop({ default: 0 })
  attempts: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
