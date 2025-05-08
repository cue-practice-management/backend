import { Injectable } from '@nestjs/common';
import { Faculty } from './schemas/faculty.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFacultyRequestDto } from './dtos/create-faculty-request.dto';
import { FacultyCreatedResponseDto } from './dtos/faculty-created-response.dto';
import { FacultyMapper } from './mappers/faculty.mapper';

@Injectable()
export class FacultyService {

    constructor(
        @InjectModel(Faculty.name)
        private readonly facultyModel: Model<Faculty>,
        private readonly facultyMapper: FacultyMapper,
    ) { }

    async createFaculty(createFacultyDto: CreateFacultyRequestDto): Promise<FacultyCreatedResponseDto> {
        const faculty = new this.facultyModel(createFacultyDto);
        await faculty.save();

        return this.facultyMapper.toCreateFacultyResponseDto(faculty);
    }

}
