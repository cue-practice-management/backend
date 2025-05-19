import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ACADEMIC_PROGRAM_CONSTRAINTS } from 'academic-program/constants/academic-program.constants';
import { Faculty } from 'faculty/schemas/faculty.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from '@common/types/base.schema';

@Schema({ timestamps: true })
export class AcademicProgram extends BaseSchema {
  @Prop({
    required: true,
    maxlength: ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MAX_LENGTH,
    minlength: ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MIN_LENGTH,
  })
  name: string;

  @Prop({
    required: true,
    maxlength: ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MAX_LENGTH,
    minlength: ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MIN_LENGTH,
  })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Faculty.name, required: true })
  faculty: mongoose.Types.ObjectId;

  @Prop({ required: true })
  durationInSemesters: number;

  @Prop({ required: true })
  coordinatorName: string;

  @Prop({ required: true, unique: true })
  coordinatorEmail: string;
}

export type AcademicProgramDocument = SoftDeletableDocument<AcademicProgram>;

export const AcademicProgramSchema =
  SchemaFactory.createForClass(AcademicProgram);

AcademicProgramSchema.plugin(mongoosePaginate);
AcademicProgramSchema.plugin(softDeletePlugin);
AcademicProgramSchema.index({ name: 1, faculty: 1 }, { unique: true });
