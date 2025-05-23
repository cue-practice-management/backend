import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schemas/user.schema';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Professor extends User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: AcademicProgram.name,
    required: true,
    set: (v: any) =>
      typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v,
  })
  academicProgram: mongoose.Types.ObjectId;
}

export type ProfessorDocument = SoftDeletableDocument<Professor>;
export const ProfessorSchema = SchemaFactory.createForClass(Professor);

ProfessorSchema.plugin(mongoosePaginate);
ProfessorSchema.plugin(softDeletePlugin);
