import { HttpStatus } from "@nestjs/common";

export const PRACTICE_TEMPLATE_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_TEMPLATE_NOT_FOUND',
        message: 'Practice template not found',
        status: HttpStatus.NOT_FOUND
    }
}
export const PRACTICE_TEMPLATE_SORT_OPTIONS = ['name', 'createdAt'];

export const DEFAULT_PRACTICE_TEMPLATE_SORT_OPTION = 'name';

export const PRACTICE_TEMPLATE_POPULATE_OPTIONS = {
    DELIVERABLES: 'deliverables',
    FORMATS: 'formats'
}