import { Injectable } from '@nestjs/common';
import { Faculty, FacultyDocument } from './schemas/faculty.schema';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFacultyRequestDto } from './dtos/create-faculty-request.dto';
import { FacultyCreatedResponseDto } from './dtos/faculty-created-response.dto';
import { FacultyMapper } from './mappers/faculty.mapper';
import { FacultyNotFoundException } from './exceptions/FacultyNotFoundException';
import { FacultyResponseDto } from './dtos/faculty-response.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { FacultyFilterDto } from './dtos/faculty-filter.dto';

@Injectable()
export class FacultyService {

    constructor(
        @InjectModel(Faculty.name)
        private readonly facultyModel: PaginateModel<FacultyDocument>,
        private readonly facultyMapper: FacultyMapper,
    ) { }

    async createFaculty(createFacultyDto: CreateFacultyRequestDto): Promise<FacultyCreatedResponseDto> {
        const faculty = new this.facultyModel(createFacultyDto);
        await faculty.save();

        return this.facultyMapper.toCreateFacultyResponseDto(faculty);
    }

    async getFacultyById(facultyId: string): Promise<FacultyResponseDto> {
        const faculty = await this.facultyModel.findById(facultyId);
        if (!faculty) {
            throw new FacultyNotFoundException();
        }
        return this.facultyMapper.toFacultyResponseDto(faculty);
    }

    async getByCriteria(filter: FacultyFilterDto): Promise<PaginatedResult<FacultyResponseDto>> {
        const { page, limit } = filter;

        const query: Record<string, any> = this.buildFilterQuery(filter);

        const result: PaginateResult<FacultyDocument> = await this.facultyModel.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
        });


        return this.facultyMapper.toFacultyResponsePaginatedDto(result)
    }

    async deleteFaculty(facultyId: string): Promise<void> {
        const faculty = await this.facultyModel.findById(facultyId);
        if (!faculty) {
            throw new FacultyNotFoundException();
        }
        faculty.softDelete();
    }


    private buildFilterQuery(filter: FacultyFilterDto): Record<string, any> {
        const query: Record<string, any> = {};

        if (filter.name) {
            query.name = new RegExp(filter.name, 'i');
        }
        if (filter.description) {
            query.description = new RegExp(filter.description, 'i');
        }
        if (filter.deanName) {
            query.deanName = new RegExp(filter.deanName, 'i');
        }
        if (filter.deanEmail) {
            query.deanEmail = filter.deanEmail;
        }

        return query;
    }

}
