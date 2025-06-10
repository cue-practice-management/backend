import { BaseSchema } from '@common/types/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class PracticeTemplateDeliverable extends BaseSchema {

    @Prop({
        type: String,
        required: true,
        set: (v: any) => {
            return typeof v === 'string' ? v : v.toString();
        },
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