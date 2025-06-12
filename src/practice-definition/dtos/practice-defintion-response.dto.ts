import { AcademicProgramResponseDto } from "@academic-program/dtos/academic-program-response.dto";
import { PracticeTemplateResponseDto } from "practice-template/dtos/practice-template-response.dto";

export class PracticeDefinitionReponseDto {
    _id: string;
    name: string;
    description: string;
    semester: number;
    academicProgram: AcademicProgramResponseDto;
    practiceTemplate: PracticeTemplateResponseDto;
    createdAt: Date;
    updatedAt: Date;
}