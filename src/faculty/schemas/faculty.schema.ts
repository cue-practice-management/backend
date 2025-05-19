import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FACULTY_CONSTRAINTS } from 'faculty/constants/faculty.constants';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Faculty extends BaseSchema {
  @Prop({
    required: true,
    maxlength: FACULTY_CONSTRAINTS.NAME.MAX_LENGTH,
    minlength: FACULTY_CONSTRAINTS.NAME.MIN_LENGTH,
  })
  name: string;

  @Prop({
    required: true,
    maxlength: FACULTY_CONSTRAINTS.DESCRIPTION.MAX_LENGTH,
    minlength: FACULTY_CONSTRAINTS.DESCRIPTION.MIN_LENGTH,
  })
  description: string;

  @Prop({ required: true })
  deanName: string;

  @Prop({ required: true, unique: true })
  deanEmail: string;
}

export type FacultyDocument = SoftDeletableDocument<Faculty>;

export const FacultySchema = SchemaFactory.createForClass(Faculty);

FacultySchema.index({ name: 1 }, { unique: true });
FacultySchema.plugin(mongoosePaginate);
FacultySchema.plugin(softDeletePlugin);
