import { PracticeTemplateDeliverableResponseDto } from './practice-template-delliverable-response.dto';
import { PracticeTemplateFormatResponseDto } from './practice-template-format-response.dto';

export class PracticeTemplateResponseDto {
    _id: string;
    name: string;
    description?: string;
    deliverables: PracticeTemplateDeliverableResponseDto[];
    formats: PracticeTemplateFormatResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}