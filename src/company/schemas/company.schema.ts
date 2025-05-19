import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from 'city/schemas/city.schema';
import { Country } from 'country/schemas/country.schema';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Company extends BaseSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  corporateName: string;

  @Prop({ required: true, unique: true })
  nit: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: true })
  openJobPositions: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: Country.name, required: true })
  country: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: City.name, required: true })
  city: mongoose.Types.ObjectId;
}

export type CompanyDocument = SoftDeletableDocument<Company>;

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.plugin(mongoosePaginate);
CompanySchema.plugin(softDeletePlugin);

CompanySchema.index({ name: 1, corporateName: 1, nit: 1 }, { unique: true });
