import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { PaginateResult } from "mongoose";
import { PracticeTemplateDeliverableResponseDto } from "practice-template/dtos/practice-template-delliverable-response.dto";
import { PracticeTemplateDeliverable } from "practice-template/schemas/practice-template-deliverable.schema";

@Injectable()
export class PracticeTemplateDeliverableMapper {
    toResponseDto(deliverable: PracticeTemplateDeliverable): PracticeTemplateDeliverableResponseDto {
        return {
            _id: deliverable._id.toString(),
            title: deliverable.title,
            description: deliverable.description,
            estimatedDueOffsetDays: deliverable.estimatedDueOffsetDays,
            createdAt: deliverable.createdAt,
            updatedAt: deliverable.updatedAt,
        };
    }

    toPaginatedResponseDto(
        docs: PaginateResult<PracticeTemplateDeliverable>
    ): PaginatedResult<PracticeTemplateDeliverableResponseDto> {
        return {
            docs: docs.docs.map(doc => this.toResponseDto(doc)),
            totalDocs: docs.totalDocs,
            page: docs.page,
            limit: docs.limit,
            totalPages: docs.totalPages,
        };

    }
}