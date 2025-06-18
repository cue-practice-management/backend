import { IsNotEmpty, Max, Min } from "class-validator";
import { PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS } from "practice-process/constants/practice-process-deliverable.constants";

export class GradePracticeProcessDeliverableRequestDto {
    @IsNotEmpty()
    @Min(PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS.GRADE.MIN)
    @Max(PRACTICE_PROCESS_DELIVERABLE_CONSTRAINTS.GRADE.MAX)
    grade: number;
    
    @IsNotEmpty()
    gradeObservations: string;
}