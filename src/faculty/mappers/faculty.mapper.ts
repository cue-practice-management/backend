import { Injectable } from "@nestjs/common";
import { FacultyCreatedResponseDto } from "faculty/dtos/faculty-created-response.dto";
import { Faculty } from "faculty/schemas/faculty.schema";

@Injectable({})
export class FacultyMapper {

    toCreateFacultyResponseDto(faculty: Faculty): FacultyCreatedResponseDto {
        return {
            _id: faculty._id.toString(),
            name: faculty.name,
            description: faculty.description,
            deanName: faculty.deanName,
            deanEmail: faculty.deanEmail,
            createdAt: faculty.createdAt,
            updatedAt: faculty.updatedAt
        };

    }
}