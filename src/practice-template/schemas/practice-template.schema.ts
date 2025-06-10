import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from '@common/types/base.schema';
import { PracticeTemplateDeliverable } from './practice-template-deliverable.schema';
import { PracticeTemplateFormat } from './practice-template-format.schema';

@Schema({ timestamps: true })
export class PracticeTemplate extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export type PracticeTemplateDocument = SoftDeletableDocument<PracticeTemplate>;
export const PracticeTemplateSchema = SchemaFactory.createForClass(PracticeTemplate);

PracticeTemplateSchema.plugin(mongoosePaginate);
PracticeTemplateSchema.plugin(softDeletePlugin);
PracticeTemplateSchema.virtual('deliverables', {
  ref: PracticeTemplateDeliverable.name,
  localField: '_id',
  foreignField: 'template',
});

PracticeTemplateSchema.virtual('formats', {
  ref: PracticeTemplateFormat.name,
  localField: '_id',
  foreignField: 'template',
});