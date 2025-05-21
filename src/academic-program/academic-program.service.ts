import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AcademicProgram,
  AcademicProgramDocument,
} from './schemas/academic-program.schema';
import { PaginateModel, PaginateResult } from 'mongoose';
import { AcademicProgramMapper } from './mappers/academic-program.mapper';
import { CreateAcademicProgramRequestDto } from './dtos/create-academic-program-request.dto';
import { AcademicProgramResponseDto } from './dtos/academic-program-response.dto';
import {
  ACADEMIC_PROGRAM_POPULATE_OPTIONS,
  ACADEMIC_PROGRAM_SORT_OPTIONS,
  DEFAULT_ACADEMIC_PROGRAM_SORT_OPTION,
} from './constants/academic-program.constants';
import { FacultyService } from 'faculty/faculty.service';
import { PaginatedResult } from '@common/types/paginated-result';
import { AcademicProgramFilterDto } from './dtos/academic-program-filter.dto';
import { getSort } from '@common/utils/pagination.util';
import { AcademicProgramNotFoundException } from './exceptions/academic-program-not-found.exception';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { MAX_TYPEAHEAD_ITEMS } from '@common/constants/constaint.constants';

@Injectable()
export class AcademicProgramService {
  constructor(
    private readonly facultyService: FacultyService,
    @InjectModel(AcademicProgram.name)
    private readonly academicProgramModel: PaginateModel<AcademicProgramDocument>,
    private readonly academicProgramMapper: AcademicProgramMapper,
  ) { }

  async createAcademicProgram(
    createAcademicProgramDto: CreateAcademicProgramRequestDto,
  ): Promise<AcademicProgramResponseDto> {
    const academicProgram = new this.academicProgramModel(
      createAcademicProgramDto,
    );

    await this.facultyService.validateFacultyExists(
      createAcademicProgramDto.faculty,
    );

    await academicProgram.save();
    await academicProgram.populate(ACADEMIC_PROGRAM_POPULATE_OPTIONS.FACULTY);
    return this.academicProgramMapper.toAcademicProgramResponseDto(
      academicProgram,
    );
  }

  async getAcademicProgramsByCriteria(
    filter: AcademicProgramFilterDto,
  ): Promise<PaginatedResult<AcademicProgramResponseDto>> {
    const { page, limit, sortBy, sortOrder } = filter;

    const query: Record<string, any> = this.buildFilterQuery(filter);

    const sort = getSort(
      ACADEMIC_PROGRAM_SORT_OPTIONS,
      DEFAULT_ACADEMIC_PROGRAM_SORT_OPTION,
      sortBy,
      sortOrder,
    );

    const result: PaginateResult<AcademicProgramDocument> =
      await this.academicProgramModel.paginate(query, {
        page,
        limit,
        populate: ACADEMIC_PROGRAM_POPULATE_OPTIONS.FACULTY,
        sort,
      });

    return this.academicProgramMapper.toAcademicProgramResponsePaginatedDto(
      result,
    );
  }

  async getTypeaheadAcademicPrograms(query: string): Promise<TypeaheadItem[]> {
    const academicPrograms = await this.academicProgramModel
      .find({
        name: { $regex: `^${query}`, $options: 'i' },
      })
      .limit(MAX_TYPEAHEAD_ITEMS);

    return academicPrograms.map((academicProgram) =>
      this.academicProgramMapper.toTypeaheadItem(academicProgram),
    );
  }

  async updateAcademicProgram(
    id: string,
    updateAcademicProgramDto: CreateAcademicProgramRequestDto,
  ): Promise<AcademicProgramResponseDto> {
    const academicProgram = await this.academicProgramModel.findById(id);

    if (!academicProgram) {
      throw new AcademicProgramNotFoundException();
    }

    await this.facultyService.validateFacultyExists(
      updateAcademicProgramDto.faculty,
    );

    Object.assign(academicProgram, updateAcademicProgramDto);
    await academicProgram.save();
    await academicProgram.populate(ACADEMIC_PROGRAM_POPULATE_OPTIONS.FACULTY);
    return this.academicProgramMapper.toAcademicProgramResponseDto(
      academicProgram,
    );
  }

  async deleteAcademicProgram(id: string): Promise<void> {
    const academicProgram = await this.academicProgramModel.findById(id);

    if (!academicProgram) {
      throw new AcademicProgramNotFoundException();
    }

    await academicProgram.softDelete();
  }

  async validateAcademicProgramExists(id: string): Promise<void> {
    const academicProgram = await this.academicProgramModel.findById(id);
    if (!academicProgram) {
      throw new AcademicProgramNotFoundException();
    }
  }

  private buildFilterQuery(
    filter: AcademicProgramFilterDto,
  ): Record<string, any> {
    const query: Record<string, any> = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter.faculty) {
      query.faculty = filter.faculty;
    }

    return query;
  }
}
