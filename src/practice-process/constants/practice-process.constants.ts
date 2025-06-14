import { UserRole } from "@common/enums/role.enum"
import { PRACTICE_DEFINITION_POPULATE_OPTIONS } from "practice-definition/constants/practice-definition.constants"
import { PROFESSOR_POPULATE_OPTIONS } from "professor/constants/professor.constants"
import { STUDENT_POPULATION_OPTIONS } from "student/constants/student.constants"

export const PRACTICE_PROCESS_EXCEPTIONS = {
    PRACTICE_PROCESS_NOT_FOUND: {
        code: 'PRACTICE_PROCESS_NOT_FOUND',
        message: 'Practice process not found.',
        status: 404,
    },
    STUDENT_HAS_NOT_COMPANY: {
        code: 'STUDENT_HAS_NOT_COMPANY',
        message: 'Student does not have a company assigned.',
        status: 400,
    },
    STUDENT_HAS_ALREADY_PRACTICE_PROCESS: {
        code: 'STUDENT_HAS_ALREADY_PRACTICE_PROCESS',
        message: 'Student already has a practice process assigned.',
        status: 400,
    },
    STUDENT_HAS_ALREADY_DONE_PRACTICE_DEFINITION: {
        code: 'STUDENT_HAS_ALREADY_DONE_PRACTICE_PROCESS',
        message: 'Student has already done this practice process.',
        status: 400,
    }
}

export const PRACTICE_PROCESS_CONSTRAINTS = {
    FINAL_GRADE: {
        MIN: 0,
        MAX: 5,
    },
}

export const PRACTICE_PROCESS_POPULATE_OPTIONS = {
    PRACTICE_DEFINITION: {
        path: 'practiceDefinition',
        populate: [
            PRACTICE_DEFINITION_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
            PRACTICE_DEFINITION_POPULATE_OPTIONS.PRACTICE_TEMPLATE
        ]
    },
    STUDENT: {
        path: 'student',
        model: UserRole.STUDENT,
        populate: [
            STUDENT_POPULATION_OPTIONS.ACADEMIC_PROGRAM,
            STUDENT_POPULATION_OPTIONS.COMPANY,
        ],
    },
    PROFESSOR: {
        path: 'professor',
        model: UserRole.PROFESSOR,
        populate: [
            PROFESSOR_POPULATE_OPTIONS.ACADEMIC_PROGRAM
        ]
    },
    COMPANY: {
        path: 'company',
    }
}

export const PRACTICE_PROCESS_SORT_OPTIONS = [
    "student",
    "professor",
    "company",
    "status",
    "startDate",
    "endDate",
]

export const PRACTICE_PROCESS_SORT_DEFAULT_OPTION = "student";