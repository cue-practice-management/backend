import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePracticeTemplateDeliverableRequestDto {
    @IsMongoId()
    template: string;

    @IsNotEmpty()
    title: string;

    description?: string;

    @IsNotEmpty()
    @IsNumber()
    estimatedDueOffsetDays: number;
}