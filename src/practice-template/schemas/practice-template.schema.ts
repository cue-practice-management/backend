import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  PracticeTemplateDeliverable,
  PracticeTemplateDeliverableSchema
} from './practice-template-deliverable.schema';
import {
  PracticeTemplateFormat,
  PracticeTemplateFormatSchema
} from './practice-template-format.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class PracticeTemplate {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [PracticeTemplateDeliverableSchema], default: [] })
  deliverables: PracticeTemplateDeliverable[];

  @Prop({ type: [PracticeTemplateFormatSchema], default: [] })
  formats: PracticeTemplateFormat[];
}

export type PracticeTemplateDocument = SoftDeletableDocument<PracticeTemplate>;
export const PracticeTemplateSchema = SchemaFactory.createForClass(PracticeTemplate);

PracticeTemplateSchema.plugin(mongoosePaginate);
PracticeTemplateSchema.plugin(softDeletePlugin);
