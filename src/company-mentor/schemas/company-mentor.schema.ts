import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schemas/user.schema';
import { Company } from 'company/schemas/company.schema';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class CompanyMentor extends User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    set: (v: any) =>
      typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v,
  })
  company: mongoose.Types.ObjectId;

  @Prop({ required: true })
  position: string;
}
export type CompanyMentorDocument = SoftDeletableDocument<CompanyMentor>;
export const CompanyMentorSchema = SchemaFactory.createForClass(CompanyMentor);

CompanyMentorSchema.index({ company: 1 });

CompanyMentorSchema.plugin(mongoosePaginate);
CompanyMentorSchema.plugin(softDeletePlugin);
