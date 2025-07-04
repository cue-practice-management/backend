import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PracticeProcess } from '../../practice-process/schemas/practice-process.schema';
import { BaseSchema } from '@common/types/base.schema';
import { FollowUpMode, FollowUpStatus } from '../enums/practice-process-follow-up.enum';
import * as mongoosePaginate from "mongoose-paginate-v2";


@Schema({ timestamps: true })
export class PracticeProcessFollowUp extends BaseSchema {
    @Prop({ type: Types.ObjectId, ref: PracticeProcess.name, required: true })
    process: Types.ObjectId;

    @Prop({ required: true, enum: FollowUpStatus, default: FollowUpStatus.SCHEDULED })
    status: FollowUpStatus;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true, enum: FollowUpMode })
    mode: FollowUpMode;

    @Prop()
    meetingUrl?: string;

    @Prop()
    location?: string;

    @Prop()
    outcomeNotes?: string;

    @Prop()
    completedAt?: Date;

    @Prop()
    cancelledAt?: Date;

    @Prop()
    cancellationReason?: string;

    @Prop()
    missedNotes?: string;
}

export type PracticeProcessFollowUpDocument = PracticeProcessFollowUp & Document;

export const PracticeProcessFollowUpSchema = SchemaFactory.createForClass(PracticeProcessFollowUp);

PracticeProcessFollowUpSchema.plugin(mongoosePaginate);