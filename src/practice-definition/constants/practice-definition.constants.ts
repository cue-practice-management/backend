import { ACADEMIC_PROGRAM_POPULATE_OPTIONS } from "@academic-program/constants/academic-program.constants";
import { HttpStatus } from "@nestjs/common";
import { PRACTICE_TEMPLATE_POPULATE_OPTIONS } from "practice-template/constants/practice-template.constants";

export const PRACTICE_DEFINITION_EXCEPTIONS = {
    NOT_FOUND: {
        code: 'PRACTICE_DEFINITION_NOT_FOUND',
        message: 'Practice definition not found',
        status: HttpStatus.NOT_FOUND
    }
}

export const PRACTICE_DEFINITION_CONTRAINTS = {
    SEMESTER: {
        MIN: 1,
        MAX: 12
    }
}

export const PRACTICE_DEFINITION_POPULATE_OPTIONS = {
    ACADEMIC_PROGRAM: {
        path: 'academicProgram',
        populate: [
            ACADEMIC_PROGRAM_POPULATE_OPTIONS.FACULTY
        ]
    },
    PRACTICE_TEMPLATE: {
        path: 'practiceTemplate',
        populate: [
            PRACTICE_TEMPLATE_POPULATE_OPTIONS.DELIVERABLES,
            PRACTICE_TEMPLATE_POPULATE_OPTIONS.FORMATS
        ]
    }

}

export const PRACTICE_DEFINITION_SORT_OPTIONS = ['name', 'semester', 'academicProgram'];

export const PRACTICE_DEFINITION_DEFAULT_SORT = 'name';