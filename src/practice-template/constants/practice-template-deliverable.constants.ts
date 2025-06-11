import { HttpStatus } from "@nestjs/common";

export const PRACTICE_TEMPLATE_DELIVERABLE_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_TEMPLATE_DELIVERABLE_NOT_FOUND',
        message: 'Practice template deliverable not found',
        status: HttpStatus.NOT_FOUND
    }
}

export const PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTIONS = ['template', 'title'];

export const DEFAULT_PRACTICE_TEMPLATE_DELIVERABLE_SORT_OPTION = 'title';