import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";
import { ACADEMIC_PROGRAM_EXCEPTION_CODES, ACADEMIC_PROGRAM_EXCEPTION_MESSAGES } from "academic-program/constants/academic-program.constants";

export class AcademicProgramNotFoundException extends BaseHttpException {
    constructor() {

        super(ACADEMIC_PROGRAM_EXCEPTION_CODES.NOT_FOUND, ACADEMIC_PROGRAM_EXCEPTION_MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);

    }
}