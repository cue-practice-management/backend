import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from 'city/schemas/city.schema';
import { CompanySize } from 'company/enums/company-size.enum';
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

  @Prop({ unique: false })
  logoUrl?: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop({ type: String, enum: CompanySize, required: true })
  size: CompanySize;

  @Prop({ default: true })
  openJobPositions: boolean;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: AcademicProgram.name,
    set: (v: any) => {
      if (Array.isArray(v)) {
        return v.map((item: any) =>
          typeof item === 'string' ? new mongoose.Types.ObjectId(item) : item,
        );
      }
      return v;
    },
  })
  associatedAcademicPrograms: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Country.name,
    required: true,
    set: (v: any) => {
      return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
    },
  })
  country: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: City.name,
    required: true,
    set: (v: any) => {
      return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
    },
  })
  city: mongoose.Types.ObjectId;

  @Prop({ required: true })
  address: string;
}

export type CompanyDocument = SoftDeletableDocument<Company>;

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.virtual('contracts', {
  ref: 'CompanyContract',
  localField: '_id',
  foreignField: 'company',
});
CompanySchema.set('toObject', { virtuals: true });
CompanySchema.set('toJSON', { virtuals: true });
CompanySchema.plugin(mongoosePaginate);
CompanySchema.plugin(softDeletePlugin);
CompanySchema.index({ name: 1, corporateName: 1, nit: 1 }, { unique: true });
