import { PracticeTemplateDeliverableResponseDto } from './practice-deliverable-response.dto';
import { PracticeTemplateFormatResponseDto } from './practice-format-response.dto';

export class PracticeTemplateResponseDto {
    _id: string;
    name: string;
    description?: string;
    deliverables: PracticeTemplateDeliverableResponseDto[];
    formats: PracticeTemplateFormatResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}