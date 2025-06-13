import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { PracticeDefinition } from 'practice-definition/schemas/practice-definition.schema';
import { Student } from 'student/schemas/student.schema';
import { Company } from 'company/schemas/company.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { PracticeProcessCancelledBy, PracticeProcessStatus } from 'practice-process/enums/practice-process.enums';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class PracticeProcess {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PracticeDefinition.name, required: true })
    practiceDefinition: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name, required: true })
    student: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company?: mongoose.Types.ObjectId;

    @Prop()
    startDate?: Date;

    @Prop()
    endDate?: Date;

    @Prop({ enum: PracticeProcessStatus, default: PracticeProcessStatus.PENDING, required: true })
    status: string;

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
