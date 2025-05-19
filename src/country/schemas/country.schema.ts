import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Country extends BaseSchema {
  @Prop({ required: true, unique: true })
  name: string;
}

export type CountryDocument = SoftDeletableDocument<Country>;

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.index({ name: 1 }, { unique: true });
CountrySchema.plugin(mongoosePaginate);
CountrySchema.plugin(softDeletePlugin);
