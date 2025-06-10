import { PracticeTemplateFormatResponseDto } from './practice-format-response.dto';
import { PracticeTemplateDeliverableResponseDto } from './practice-template-delliverable-response.dto';

export class PracticeTemplateResponseDto {
    _id: string;
    name: string;
    description?: string;
    deliverables: PracticeTemplateDeliverableResponseDto[];
    formats: PracticeTemplateFormatResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}