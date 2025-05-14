import { Injectable } from "@nestjs/common";
import { AcademicProgramResponseDto } from "academic-program/dtos/academic-program-response.dto";
import { AcademicProgram } from "academic-program/schemas/academic-program.schema";
import { FacultyMapper } from "faculty/mappers/faculty.mapper";
import { Faculty } from "faculty/schemas/faculty.schema";

@Injectable()
export class AcademicProgramMapper {
    constructor(private readonly facultyMapper: FacultyMapper) { }

    toAcademicProgramResponseDto(academicProgram: AcademicProgram): AcademicProgramResponseDto {
        return {
            _id: academicProgram._id.toString(),
            name: academicProgram.name,
            description: academicProgram.description,
            faculty: this.facultyMapper.toFacultyResponseDto(academicProgram.faculty as unknown as Faculty),
            durationInSemesters: academicProgram.durationInSemesters,
            coordinatorName: academicProgram.coordinatorName,
            coordinatorEmail: academicProgram.coordinatorEmail,
            createdAt: academicProgram.createdAt,
        };
    }

}