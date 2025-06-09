import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class PracticeTemplateDeliverable {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    estimatedDueOffsetDays: number;
}

export type PracticeTemplateDeliverableDocument = PracticeTemplateDeliverable & Document;
export const PracticeTemplateDeliverableSchema = SchemaFactory.createForClass(PracticeTemplateDeliverable);
