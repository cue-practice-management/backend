import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { CompanyMapper } from "company/mappers/company.mapper";
import { Company } from "company/schemas/company.schema";
import { PaginateResult } from "mongoose";
import { StudentCompanyLinkingProcessResponseDto } from "student-company-linking-process/dtos/student-company-linking-process-response.dto";
import { StudentCompanyLinkingProcess } from "student-company-linking-process/schemas/student-company-linking-process.schema";
import { StudentMapper } from "student/mapper/student.mapper";
import { Student } from "student/schemas/student.schema";

@Injectable()
export class StudentCompanyLinkingProcessMapper {
    constructor(
        private readonly studentMapper: StudentMapper,
        private readonly companyMapper: CompanyMapper

    ) { }

    toResponseDto(entity: StudentCompanyLinkingProcess): StudentCompanyLinkingProcessResponseDto {
        return {
            _id: entity._id.toString(),
            student: this.studentMapper.toStudentResponseDto(entity.student as unknown as Student),
            company: this.companyMapper.toCompanyResponseDto(entity.company as unknown as Company),
            status: entity.status,
            observations: entity.observations,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    toPaginatedResponseDto(entities: PaginateResult<StudentCompanyLinkingProcess>): PaginatedResult<StudentCompanyLinkingProcessResponseDto> {
        return {
            docs: entities.docs.map((entity) => this.toResponseDto(entity)),
            totalDocs: entities.totalDocs,
            totalPages: entities.totalPages,
            page: entities.page,
            limit: entities.limit,
        };
    }
}