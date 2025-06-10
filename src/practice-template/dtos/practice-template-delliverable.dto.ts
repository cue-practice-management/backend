import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PracticeTemplateDeliverableDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  estimatedDueOffsetDays: number;
}