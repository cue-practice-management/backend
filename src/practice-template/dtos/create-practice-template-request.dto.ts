import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePracticeTemplateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}