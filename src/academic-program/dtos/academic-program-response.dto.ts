import { FacultyResponseDto } from "faculty/dtos/faculty-response.dto";

export class AcademicProgramResponseDto {
    _id: string;
    name: string;
    description: string;
    faculty: FacultyResponseDto; 
    durationInSemesters: number;
    coordinatorName: string;
    coordinatorEmail: string;
    createdAt: Date;
}