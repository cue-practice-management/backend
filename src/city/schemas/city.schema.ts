import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Country } from 'country/schemas/country.schema';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class City extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: Country.name,
    required: true,
    set: (v: any) =>
      typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v,
  })
  country: mongoose.Types.ObjectId;
}

export type CityDocument = SoftDeletableDocument<City>;

export const CitySchema = SchemaFactory.createForClass(City);
CitySchema.index({ name: 1, country: 1 }, { unique: true });

CitySchema.plugin(mongoosePaginate);
CitySchema.plugin(softDeletePlugin);
