import { BaseSchema } from "@common/types/base.schema";
import { SoftDeletableDocument } from "@common/types/soft-deletable-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Company } from "company/schemas/company.schema";
import mongoose from "mongoose";
import { StudentCompanyContractStatus } from "student-company-contract/enums/student-company-contract-status.enum";
import { StudentCompanyLinkingProcess } from "student-company-linking-process/schemas/student-company-linking-process.schema";
import { Student } from "student/schemas/student.schema";
import { StudentCompanyContractCancelledBy } from "student-company-contract/enums/student-company-contract-cancelled-by.enum";
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { softDeletePlugin } from "@common/plugins/soft-delete.plugin";

@Schema({ timestamps: true })
export class StudentCompanyContract extends BaseSchema {
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Student.name, required: true, set: (v: any) => {
            return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
        }
    })
    student: mongoose.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: Company.name, required: true, set: (v: any) => {
            return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
        }
    })
    company: mongoose.Types.ObjectId;

    @Prop({ required: false })
    startDate?: Date;

    @Prop({ required: false })
    endDate?: Date;

    @Prop({ default: false })
    isPaid: boolean;

    @Prop({ required: true, enum: StudentCompanyContractStatus })
    status: StudentCompanyContractStatus;

    @Prop({ required: false })
    contractUrl?: string;

    @Prop({ required: false })
    cancellationReason?: string;

    @Prop({ required: false })
    cancellationDate?: Date;

    @Prop({ required: false, enum: StudentCompanyContractCancelledBy })
    cancelledBy?: StudentCompanyContractCancelledBy

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: StudentCompanyLinkingProcess.name,
        required: false,
        set: (v: any) => (typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v),
    })
    linkingProcess?: mongoose.Types.ObjectId;
}
export type StudentCompanyContractDocument = SoftDeletableDocument<StudentCompanyContract>;

export const StudentCompanyContractSchema = SchemaFactory.createForClass(StudentCompanyContract);
StudentCompanyContractSchema.index({ student: 1, company: 1 } );
StudentCompanyContractSchema.plugin(softDeletePlugin);
StudentCompanyContractSchema.plugin(mongoosePaginate);


