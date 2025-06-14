import { IsOptional, IsString } from "class-validator";

export class UpdatePracticeTemplateRequestDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}