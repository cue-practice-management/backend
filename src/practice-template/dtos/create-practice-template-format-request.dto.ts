import { IsNotEmpty } from "class-validator";

export class CreatePracticeTemplateFormatRequestDto {
    template: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}