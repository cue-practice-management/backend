import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PracticeProcess } from "./practice-process.schema";
import { PracticeTemplateDeliverable } from "practice-template/schemas/practice-template-deliverable.schema";
import { PracticeProcessDeliverableStatus } from "practice-process/enums/practice-process-deliverable.enums";
import { PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS } from "practice-process/constants/practice-process-deliverable.constants";
import { Professor } from "professor/schemas/professor.schema";

@Schema({ timestamps: true })
export class PracticeProccessDeliverable {
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

  @Prop({ type: Types.ObjectId, ref: Professor.name })
  gradedBy?: Types.ObjectId;

  @Prop()
  gradedAt?: Date;
}