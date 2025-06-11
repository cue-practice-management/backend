import { IsNumber, IsOptional } from "class-validator";

export class UpdatePracticeTemplateDeliverableRequestDto {
        @IsOptional()
        title?: string;

        @IsOptional()    
        description?: string;
    
        @IsOptional()
        @IsNumber()
        estimatedDueOffsetDays?: number;
}