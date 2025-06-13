import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PracticeProcess } from '../../practice-process/schemas/practice-process.schema';
import { BaseSchema } from '@common/types/base.schema';

@Schema({ timestamps: true })
export class PracticeProcessFollowUp extends BaseSchema {
    @Prop({ type: Types.ObjectId, ref: PracticeProcess.name, required: true })
    process: Types.ObjectId;

    @Prop({ required: true })
    date: Date;

    @Prop()
    notes?: string;
}

export type PracticeProcessFollowUpDocument =
    PracticeProcessFollowUp & Document;

export const PracticeProcessFollowUpSchema =
    SchemaFactory.createForClass(PracticeProcessFollowUp);
