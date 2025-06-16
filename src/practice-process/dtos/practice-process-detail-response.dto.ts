import { PracticeProcessDeliverableResponseDto } from "./practice-process-deliverable-response.dto";
import { PracticeProcessFollowUpResponseDto } from "./practice-process-follow-up-response.dto";
import { PracticeProcessResponseDto } from "./practice-process-response.dto";

export class PracticeProcessDetailResponseDto extends PracticeProcessResponseDto {
    deliverables: PracticeProcessDeliverableResponseDto[];
    followUps: PracticeProcessFollowUpResponseDto[];
}