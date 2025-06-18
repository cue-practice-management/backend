import { HttpStatus } from "@nestjs/common";


export const PRACTICE_PROCESS_FOLLOW_UP_EXCEPTIONS = {
    NOT_AUTHORIZED_TO_SCHEDULE: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_NOT_AUTHORIZED_TO_SCHEDULE',
        message: 'You are not authorized to schedule a follow-up for this practice process.',
        status: HttpStatus.FORBIDDEN,
    },
    INVALID_STATUS_TO_SCHEDULE: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_INVALID_STATUS_TO_SCHEDULE',
        message: 'Follow-up cannot be scheduled in current practice process status.',
        status: HttpStatus.BAD_REQUEST,
    },
    PROFESSOR_HAS_ALREADY_FOLLOW_UP_ON_DATE: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_PROFESSOR_HAS_ALREADY_FOLLOW_UP_ON_DATE',
        message: 'Professor has already scheduled a follow-up on this date.',
        status: HttpStatus.BAD_REQUEST,
    }
}