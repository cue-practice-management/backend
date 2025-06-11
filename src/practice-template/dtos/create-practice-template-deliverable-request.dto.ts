import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePracticeTemplateDeliverableRequestDto {
    template: string;

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    estimatedDueOffsetDays: number;
}