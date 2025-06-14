import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PracticeDefinition } from 'practice-definition/schemas/practice-definition.schema';
import { Student } from 'student/schemas/student.schema';
import { Company } from 'company/schemas/company.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { PracticeProcessCancelledBy, PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';
import { Professor } from 'professor/schemas/professor.schema';
import { PRACTICE_PROCESS_CONSTRAINTS } from 'practice-process/constants/practice-process.constants';
import { BaseSchema } from '@common/types/base.schema';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class PracticeProcess extends BaseSchema {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PracticeDefinition.name, required: true })
    practiceDefinition: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name, required: true })
    student: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Professor.name, required: true })
    professor: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name, required: true })
    company: mongoose.Types.ObjectId;

    @Prop({ enum: PracticeProcessStatus, default: PracticeProcessStatus.PENDING, required: true })
    status: PracticeProcessStatus;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: false, min: PRACTICE_PROCESS_CONSTRAINTS.FINAL_GRADE.MIN, max: PRACTICE_PROCESS_CONSTRAINTS.FINAL_GRADE.MAX })
    finalGrade?: number;

    @Prop({ required: false, enum: PracticeProcessCancelledBy })
    cancelledBy?: PracticeProcessCancelledBy;

    @Prop({ required: false })
    cancellationReason?: string;

    @Prop({ required: false })
    cancellationDate?: Date;
}

export type PracticeProcessDocument = SoftDeletableDocument<PracticeProcess>;
export const PracticeProcessSchema = SchemaFactory.createForClass(PracticeProcess);

PracticeProcessSchema.plugin(softDeletePlugin);
PracticeProcessSchema.plugin(mongoosePaginate);

PracticeProcessSchema.virtual('deliverables', {
    ref: 'PracticeProcessDeliverable',
    localField: '_id',
    foreignField: 'process',
});

PracticeProcessSchema.virtual('followUps', {
    ref: 'PracticeProcessFollowUp',
    localField: '_id',
    foreignField: 'process',
});
