import { FollowUpMode, FollowUpStatus } from "practice-process/enums/practice-process-follow-up.enum";

export interface PracticeProcessFollowUpResponseDto {
    _id: string;
    status: FollowUpStatus;
    mode: FollowUpMode;
    meetingUrl?: string;
    location?: string;
    date: Date;
    outcomeNotes?: string;
    completedAt?: Date;
    cancelledAt?: Date;
    cancellationReason?: string;
    missedNotes?: string;
}