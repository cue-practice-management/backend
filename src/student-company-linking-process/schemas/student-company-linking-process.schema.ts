import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from 'company/schemas/company.schema';
import mongoose from 'mongoose';
import { StudentCompanyLinkingProcessStatus } from 'student-company-linking-process/enums/student-company-linking-process-status.enum';
import { Student } from 'student/schemas/student.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from '@common/types/base.schema';

@Schema({ timestamps: true })
export class StudentCompanyLinkingProcess extends BaseSchema {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.name,
    required: true,
    set: (v: any) => {
      return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
    },
  })
  student: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    set: (v: any) => {
      return typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v;
    },
  })
  company: mongoose.Types.ObjectId;

  @Prop({
    enum: StudentCompanyLinkingProcessStatus,
    default: StudentCompanyLinkingProcessStatus.PENDING,
  })
  status: StudentCompanyLinkingProcessStatus;

  @Prop({ required: false })
  observations?: string;
}

export type StudentCompanyLinkingProcessDocument =
  SoftDeletableDocument<StudentCompanyLinkingProcess>;

export const StudentCompanyLinkingProcessSchema = SchemaFactory.createForClass(
  StudentCompanyLinkingProcess,
);
StudentCompanyLinkingProcessSchema.index({ student: 1, company: 1 });

StudentCompanyLinkingProcessSchema.plugin(mongoosePaginate);
StudentCompanyLinkingProcessSchema.plugin(softDeletePlugin);
