import { IsOptional } from "class-validator";

export class UpdatePracticeTemplateFormatRequestDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;
}