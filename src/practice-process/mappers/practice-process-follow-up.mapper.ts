import { Injectable } from "@nestjs/common";
import { PracticeProcessFollowUpResponseDto } from "practice-process/dtos/practice-process-follow-up-response.dto";
import { PracticeProcessFollowUp } from "practice-process/schemas/practice-process-follow-up.schema";

@Injectable()
export class PracticeProcessFollowUpMapper {

    toResponseDto(practiceProcessFollowUp: PracticeProcessFollowUp): PracticeProcessFollowUpResponseDto {
        return {
            _id: practiceProcessFollowUp._id.toString(),
            status: practiceProcessFollowUp.status,
            mode: practiceProcessFollowUp.mode,
            meetingUrl: practiceProcessFollowUp.meetingUrl,
            location: practiceProcessFollowUp.location,
            date: practiceProcessFollowUp.date,
            outcomeNotes: practiceProcessFollowUp.outcomeNotes,
            completedAt: practiceProcessFollowUp.completedAt,
            cancelledAt: practiceProcessFollowUp.cancelledAt,
            cancellationReason: practiceProcessFollowUp.cancellationReason,
            missedNotes: practiceProcessFollowUp.missedNotes
        }
    }
}