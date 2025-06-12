import { AcademicProgramMapper } from "@academic-program/mappers/academic-program.mapper";
import { AcademicProgram } from "@academic-program/schemas/academic-program.schema";
import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { PaginateResult } from "mongoose";
import { PracticeDefinitionReponseDto } from "practice-definition/dtos/practice-defintion-response.dto";
import { PracticeDefinition } from "practice-definition/schemas/practice-definition.schema";
import { PracticeTemplateMapper } from "practice-template/mappers/practice-template-mapper";
import { PracticeTemplateDocument } from "practice-template/schemas/practice-template.schema";

@Injectable()
export class PracticeDefinitionMapper {
    constructor(
        private readonly academicProgramMapper: AcademicProgramMapper,
        private readonly practiceTemplateMapper: PracticeTemplateMapper, 
    ) {}
    toResponseDto(practiceDefinition: PracticeDefinition): PracticeDefinitionReponseDto {
        return {
            _id: practiceDefinition._id.toString(),
            name: practiceDefinition.name,
            description: practiceDefinition.description,
            semester: practiceDefinition.semester,
            academicProgram: this.academicProgramMapper.toAcademicProgramResponseDto(practiceDefinition.academicProgram as unknown as AcademicProgram),
            practiceTemplate: this.practiceTemplateMapper.toResponseDto(practiceDefinition.practiceTemplate as unknown as PracticeTemplateDocument),
            createdAt: practiceDefinition.createdAt,
            updatedAt: practiceDefinition.updatedAt,
        }
    }

    toPaginatedResponseDto(practiceDefinitions: PaginateResult<PracticeDefinition>): PaginatedResult<PracticeDefinitionReponseDto> {

        return {
            docs: practiceDefinitions.docs.map(this.toResponseDto.bind(this)),
            totalDocs: practiceDefinitions.totalDocs,
            limit: practiceDefinitions.limit,
            totalPages: practiceDefinitions.totalPages,
            page: practiceDefinitions.page,
        }

    }
}