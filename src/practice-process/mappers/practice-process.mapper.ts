import { Injectable } from "@nestjs/common";
import { CompanyMapper } from "company/mappers/company.mapper";
import { Company } from "company/schemas/company.schema";
import { PracticeDefinitionMapper } from "practice-definition/mappers/practice-definition.mapper";
import { PracticeDefinition } from "practice-definition/schemas/practice-definition.schema";
import { PracticeProcessResponseDto } from "practice-process/dtos/practice-process-response.dto";
import { PracticeProcess } from "practice-process/schemas/practice-process.schema";
import { ProfessorMapper } from "professor/mappers/professor.mapper";
import { Professor } from "professor/schemas/professor.schema";
import { StudentMapper } from "student/mapper/student.mapper";
import { Student } from "student/schemas/student.schema";

@Injectable()
export class PracticeProcessMapper {

    constructor(
        private readonly practiceDefinitionMapper: PracticeDefinitionMapper,
        private readonly studentMapper: StudentMapper,
        private readonly professorMapper: ProfessorMapper,
        private readonly companyMapper: CompanyMapper,
    ) { }

    toResponseDto(practiceProcess: PracticeProcess): PracticeProcessResponseDto {
        return {
            _id: practiceProcess._id.toString(),
            practiceDefinition: this.practiceDefinitionMapper.toResponseDto(practiceProcess.practiceDefinition as unknown as PracticeDefinition),
            student: this.studentMapper.toStudentResponseDto(practiceProcess.student as unknown as Student),
            professor: this.professorMapper.toProfessorResponseDto(practiceProcess.professor as unknown as Professor),
            company: this.companyMapper.toCompanyBasicInfoResponseDto(practiceProcess.company as unknown as Company),
            startDate: practiceProcess.startDate,
            endDate: practiceProcess.endDate,
            status: practiceProcess.status,
            finalGrade: practiceProcess.finalGrade,
            cancelledBy: practiceProcess.cancelledBy,
            cancellationDate: practiceProcess.cancellationDate,
            cancellationReason: practiceProcess.cancellationReason,
            createdAt: practiceProcess.createdAt,
            updatedAt: practiceProcess.updatedAt,
            //TODO Deliverables and FollowUps should be added here when implemented
        };

    }
}