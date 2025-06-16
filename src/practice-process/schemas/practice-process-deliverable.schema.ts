import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PracticeProcess } from "./practice-process.schema";
import { PracticeTemplateDeliverable } from "practice-template/schemas/practice-template-deliverable.schema";
import { PracticeProcessDeliverableStatus } from "practice-process/enums/practice-process-deliverable.enums";
import { PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS } from "practice-process/constants/practice-process-deliverable.constants";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { BaseSchema } from "@common/types/base.schema";

@Schema({ timestamps: true })
export class PracticeProcessDeliverable extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: PracticeProcess.name, required: true })
  process: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: PracticeTemplateDeliverable.name, required: true })
  templateDeliverable: Types.ObjectId;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  submittedAt?: Date;

  @Prop()
  submissionUrl?: string;

  @Prop({ required: true, enum: PracticeProcessDeliverableStatus, default: PracticeProcessDeliverableStatus.PENDING })
  status: PracticeProcessDeliverableStatus;

  @Prop({ required: false, min: PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS.GRADE.MIN, max: PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS.GRADE.MAX })
  grade?: number;

  @Prop({ required: false })
  gradeObservations?: string;

  @Prop()
  gradedAt?: Date;
}

export type PracticeProcessDeliverableDocument = PracticeProcessDeliverable & Document;
export const PracticeProcessDeliverableSchema = SchemaFactory.createForClass(PracticeProcessDeliverable);

PracticeProcessDeliverableSchema.plugin(mongoosePaginate);