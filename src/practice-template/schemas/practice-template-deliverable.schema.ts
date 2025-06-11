import { BaseSchema } from '@common/types/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PracticeTemplate } from './practice-template.schema';

@Schema({ timestamps: true })
export class PracticeTemplateDeliverable extends BaseSchema {

    @Prop({
        type: Types.ObjectId,
        ref: PracticeTemplate.name,
        required: false,
        set: (v: any) =>
            typeof v === 'string' ? new Types.ObjectId(v) : v,
    })
    template: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    estimatedDueOffsetDays: number;
}

export type PracticeTemplateDeliverableDocument = PracticeTemplateDeliverable & Document;
export const PracticeTemplateDeliverableSchema = SchemaFactory.createForClass(PracticeTemplateDeliverable);


PracticeTemplateDeliverableSchema.plugin(mongoosePaginate)