import { PracticeProcessDeliverableStatus } from "practice-process/enums/practice-process-deliverable.enums";

export interface PracticeProcessDeliverableResponseDto {
    _id: string;
    dueDate: Date;
    submittedAt?: Date;
    submissionUrl?: string;
    status: PracticeProcessDeliverableStatus;
    grade?: number;
    gradeObservations?: string;
    gradedAt?: Date;
}