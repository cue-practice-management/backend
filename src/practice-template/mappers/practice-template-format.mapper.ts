import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { PaginateResult } from "mongoose";
import { PracticeTemplateFormatResponseDto } from "practice-template/dtos/practice-template-format-response.dto";
import { PracticeTemplateFormat } from "practice-template/schemas/practice-template-format.schema";

@Injectable()
export class PracticeTemplateFormatMapper {

    toResponseDto(practiceTemplateFormat: PracticeTemplateFormat): PracticeTemplateFormatResponseDto {
        return {
            _id: practiceTemplateFormat._id.toString(),
            name: practiceTemplateFormat.name,
            description: practiceTemplateFormat.description,
            fileUrl: practiceTemplateFormat.fileUrl,
            createdAt: practiceTemplateFormat.createdAt,
            updatedAt: practiceTemplateFormat.updatedAt,
        };
    }

    toPaginatedResponseDto(practiceTemplateFormats: PaginateResult<PracticeTemplateFormat>): PaginatedResult<PracticeTemplateFormatResponseDto> {
        return {
            docs: practiceTemplateFormats.docs.map(doc => this.toResponseDto(doc)),
            totalDocs: practiceTemplateFormats.totalDocs,
            page: practiceTemplateFormats.page,
            limit: practiceTemplateFormats.limit,
            totalPages: practiceTemplateFormats.totalPages,
        };
    }
}