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
    },
    INVALID_STATUS_TO_CANCEL: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_INVALID_STATUS_TO_CANCEL',
        message: 'Follow-up cannot be canceled in current status.',
        status: HttpStatus.BAD_REQUEST,
    },
    INVALID_STATUS_TO_COMPLETE: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_INVALID_STATUS_TO_COMPLETE',
        message: 'Follow-up cannot be completed in current status.',
        status: HttpStatus.BAD_REQUEST,
    },
    INVALID_DATE_TO_COMPLETE: {
        code: 'PRACTICE_PROCESS_FOLLOW_UP_INVALID_DATE_TO_COMPLETE',
        message: 'Follow-up cannot be completed on this date, since it is in the past.',
        status: HttpStatus.BAD_REQUEST,
    },
}