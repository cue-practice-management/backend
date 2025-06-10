import { Injectable } from "@nestjs/common";
import { PracticeTemplateResponseDto } from "practice-template/dtos/practice-template-response.dto";
import { PracticeTemplate, PracticeTemplateDocument } from "practice-template/schemas/practice-template.schema";

@Injectable()
export class PracticeTemplateMapper {
    toResponseDto(
        doc: PracticeTemplateDocument & { deliverables?: any[]; formats?: any[] }
    ): PracticeTemplateResponseDto {
        return {
            _id: doc._id.toString(),
            name: doc.name,
            description: doc.description,
            deliverables: (doc.deliverables || []).map(d => ({
                _id: d._id.toString(),
                template: doc._id.toString(),
                title: d.title,
                description: d.description,
                estimatedDueOffsetDays: d.estimatedDueOffsetDays,
                createdAt: d.createdAt,
                updatedAt: d.updatedAt,
            })),
            formats: (doc.formats || []).map(f => ({
                _id: f._id.toString(),
                template: doc._id.toString(),
                name: f.name,
                description: f.description,
                fileUrl: f.fileUrl,
                createdAt: f.createdAt,
                updatedAt: f.updatedAt,
            })),
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}
