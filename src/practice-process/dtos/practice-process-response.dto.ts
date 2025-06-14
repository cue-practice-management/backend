import { CompanyBasicInfoResponseDto } from "company/dtos/company-basic-info-responde.dto";
import { PracticeDefinitionReponseDto } from "practice-definition/dtos/practice-defintion-response.dto";
import { PracticeProcessCancelledBy, PracticeProcessStatus } from "practice-process/enums/practice-process.enums";
import { ProfessorResponseDto } from "professor/dtos/profesor-response.dto";
import { StudentResponseDto } from "student/dtos/student-response.dto";

export class PracticeProcessResponseDto {
    _id: string;
    practiceDefinition: PracticeDefinitionReponseDto;
    student: StudentResponseDto;
    professor: ProfessorResponseDto;
    company: CompanyBasicInfoResponseDto;
    startDate: Date;
    endDate: Date;
    status: PracticeProcessStatus;
    finalGrade?: number;
    cancelledBy?: PracticeProcessCancelledBy;
    cancellationDate?: Date;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
}