import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AcademicProgram, AcademicProgramDocument } from './schemas/academic-program.schema';
import { PaginateModel } from 'mongoose';
import { AcademicProgramMapper } from './mappers/academic-program.mapper';
import { CreateAcademicProgramRequestDto } from './dtos/create-academic-program-request.dto';
import { AcademicProgramResponseDto } from './dtos/academic-program-response.dto';
import { ACADEMIC_PROGRAM_POPULATE_OPTIONS } from './constants/academic-program.constants';
import { FacultyService } from 'faculty/faculty.service';

@Injectable()
export class AcademicProgramService {
    constructor(
        private readonly facultyService: FacultyService,
        @InjectModel(AcademicProgram.name)
        private readonly academicProgramModel: PaginateModel<AcademicProgramDocument>,
        private readonly academicProgramMapper: AcademicProgramMapper,
    ) { }

    async createAcademicProgram(createAcademicProgramDto: CreateAcademicProgramRequestDto): Promise<AcademicProgramResponseDto> {
        const academicProgram = new this.academicProgramModel(createAcademicProgramDto);

        await this.facultyService.validateFacultyExists(createAcademicProgramDto.faculty);

        await academicProgram.save();
        await academicProgram.populate(ACADEMIC_PROGRAM_POPULATE_OPTIONS.FACULTY);
        return this.academicProgramMapper.toAcademicProgramResponseDto(academicProgram);
    }
}
