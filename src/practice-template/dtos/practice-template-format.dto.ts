import { IsNotEmpty, IsString } from "class-validator";

export class PracticeTemplateFormatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  fileUrl?: string;
}