import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { CompanyMapper } from "company/mappers/company.mapper";
import { Company } from "company/schemas/company.schema";
import { PaginateResult } from "mongoose";
import { PracticeDefinitionMapper } from "practice-definition/mappers/practice-definition.mapper";
import { PracticeDefinition } from "practice-definition/schemas/practice-definition.schema";
import { PracticeProcessDetailResponseDto } from "practice-process/dtos/practice-process-detail-response.dto";
import { PracticeProcessResponseDto } from "practice-process/dtos/practice-process-response.dto";
import { PracticeProcessDeliverable } from "practice-process/schemas/practice-process-deliverable.schema";
import { PracticeProcessFollowUp } from "practice-process/schemas/practice-process-follow-up.schema";
import { PracticeProcess } from "practice-process/schemas/practice-process.schema";
import { ProfessorMapper } from "professor/mappers/professor.mapper";
import { Professor } from "professor/schemas/professor.schema";
import { StudentMapper } from "student/mapper/student.mapper";
import { Student } from "student/schemas/student.schema";
import { PracticeProcessDeliverableMapper } from "./practice-process-deliverable.mapper";
import { PracticeProcessFollowUpMapper } from "./practice-process-follow-up.mapper";

@Injectable()
export class PracticeProcessMapper {

    constructor(
        private readonly practiceDefinitionMapper: PracticeDefinitionMapper,
        private readonly practiceProcessDeliverableMapper: PracticeProcessDeliverableMapper,
        private readonly practiceProcessFollowUpMapper: PracticeProcessFollowUpMapper,
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
        };
    }

    async toDetailedResponseDto(practiceProcess: PracticeProcess & { deliverables: PracticeProcessDeliverable[], followUps: PracticeProcessFollowUp[] }): Promise<PracticeProcessDetailResponseDto> {
        return {
            ...this.toResponseDto(practiceProcess),
            deliverables: await Promise.all(practiceProcess.deliverables.map(deliverable => this.practiceProcessDeliverableMapper.toResponseDto(deliverable))),
            followUps: practiceProcess.followUps.map(followUp => this.practiceProcessFollowUpMapper.toResponseDto(followUp)),
        };
    }

    toPaginatedResponseDto(practiceProcesses: PaginateResult<PracticeProcess>): PaginatedResult<PracticeProcessResponseDto> {
        return {
            docs: practiceProcesses.docs.map((process) => this.toResponseDto(process)),
            totalDocs: practiceProcesses.totalDocs,
            limit: practiceProcesses.limit,
            totalPages: practiceProcesses.totalPages,
            page: practiceProcesses.page,
        };

    }
}