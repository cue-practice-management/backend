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
import { UpdateFacultyRequestDto } from './dtos/update-faculty-request.dto';
import {
  DEFAULT_FACULTY_SORT_OPTION,
  FACULTY_SORT_OPTIONS,
} from './constants/faculty.constants';
import { getSort, getSortDirection } from '@common/utils/pagination.util';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { MAX_TYPEAHEAD_ITEMS } from '@common/constants/constaint.constants';

@Injectable()
export class FacultyService {
  constructor(
    @InjectModel(Faculty.name)
    private readonly facultyModel: PaginateModel<FacultyDocument>,
    private readonly facultyMapper: FacultyMapper,
  ) {}

  async createFaculty(
    createFacultyDto: CreateFacultyRequestDto,
  ): Promise<FacultyCreatedResponseDto> {
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

  async getByCriteria(
    filter: FacultyFilterDto,
  ): Promise<PaginatedResult<FacultyResponseDto>> {
    const { page, limit, sortBy, sortOrder } = filter;

    const query: Record<string, any> = this.buildFilterQuery(filter);
    const sort = getSort(
      FACULTY_SORT_OPTIONS,
      DEFAULT_FACULTY_SORT_OPTION,
      sortBy,
      sortOrder,
    );
    const result: PaginateResult<FacultyDocument> =
      await this.facultyModel.paginate(query, {
        page,
        limit,
        sort,
      });

    return this.facultyMapper.toFacultyResponsePaginatedDto(result);
  }

  async updateFaculty(
    facultyId: string,
    updateFacultyDto: UpdateFacultyRequestDto,
  ): Promise<FacultyResponseDto> {
    const faculty = await this.facultyModel.findById(facultyId);
    if (!faculty) {
      throw new FacultyNotFoundException();
    }

    Object.assign(faculty, updateFacultyDto);
    await faculty.save();

    return this.facultyMapper.toFacultyResponseDto(faculty);
  }

  async deleteFaculty(facultyId: string): Promise<void> {
    const faculty = await this.facultyModel.findById(facultyId);
    if (!faculty) {
      throw new FacultyNotFoundException();
    }
    faculty.softDelete();
  }

  async validateFacultyExists(facultyId: string): Promise<void> {
    const faculty = await this.facultyModel.exists({ _id: facultyId });
    if (!faculty) {
      throw new FacultyNotFoundException();
    }
  }

  async getFacultyTypeahead(query: string): Promise<TypeaheadItem[]> {
    const faculties = await this.facultyModel
      .find({
        name: { $regex: `^${query}`, $options: 'i' },
      })
      .limit(MAX_TYPEAHEAD_ITEMS);

    return faculties.map((faculty) =>
      this.facultyMapper.toFacultyTypeaheadItem(faculty),
    );
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
