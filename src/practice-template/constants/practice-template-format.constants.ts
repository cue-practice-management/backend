import { HttpStatus } from "@nestjs/common";

export const PRACTICE_TEMPLATE_FORMAT_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_TEMPLATE_FORMAT_NOT_FOUND',
        message: 'Practice template format not found',
        status: HttpStatus.NOT_FOUND
    },
    FILE_MISSING: {
        code: 'PRACTICE_TEMPLATE_FORMAT_FILE_MISSING',
        message: 'File is required for creating a practice template format',
        status: HttpStatus.BAD_REQUEST
    }
}

export const PRACTICE_TEMPLATE_FORMAT_SORT_OPTIONS = ['template', 'name'];

export const DEFAULT_PRACTICE_TEMPLATE_FORMAT_SORT_OPTION = 'name';