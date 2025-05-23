import { Injectable } from '@nestjs/common';
import { ProfessorDocument } from './schemas/professor.schema';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@user/schemas/user.schema';
import { UserRole } from '@common/enums/role.enum';
import { UserService } from '@user/user.service';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import { ProfessorMapper } from './mappers/professor.mapper';
import { DEFAULT_PROFESSOR_SORT_OPTION, PROFESSOR_POPULATE_OPTIONS, PROFESSOR_SORT_OPTIONS } from './constants/professor.constants';
import { CreateProfessorRequestDto } from './dtos/create-professor-request.dto';
import { ProfessorResponseDto } from './dtos/profesor-response.dto';
import { ProfessorNotFoundException } from './exceptions/professor-not-found.exception';
import { ProfessorFilterDto } from './dtos/professor-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { UpdateProfessorRequestDto } from './dtos/update-professor-request.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ProfessorService {
    private readonly professorModel: PaginateModel<ProfessorDocument>;

    constructor(
        @InjectModel(User.name)
        private readonly userModel: PaginateModel<UserDocument>,
        private readonly userService: UserService,
        private readonly academicProgramService: AcademicProgramService,
        private readonly professorMapper: ProfessorMapper,
    ) {
        this.professorModel = this.userModel.discriminators?.[UserRole.PROFESSOR] as PaginateModel<ProfessorDocument>;
    }

    async createProfessor(createProfessorDto: CreateProfessorRequestDto): Promise<ProfessorResponseDto> {
        const professor = new this.professorModel({
            role: UserRole.PROFESSOR,
            password: this.generateProfessorPassword(createProfessorDto.documentNumber),
            ...createProfessorDto,
        });

        await this.userService.validateUniqueFields(createProfessorDto);
        await this.academicProgramService.validateAcademicProgramExists(createProfessorDto.academicProgram);

        await professor.save();
        await professor.populate([PROFESSOR_POPULATE_OPTIONS.ACADEMIC_PROGRAM]);

        return this.professorMapper.toProfessorResponseDto(professor);
    }

    async findProfessorById(professorId: string): Promise<ProfessorResponseDto> {
        const professor = await this.professorModel
            .findById(professorId)
            .populate(PROFESSOR_POPULATE_OPTIONS.ACADEMIC_PROGRAM);

        if (!professor) {
            throw new ProfessorNotFoundException();
        }

        return this.professorMapper.toProfessorResponseDto(professor);
    }

    private generateProfessorPassword(documentNumber: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(documentNumber, salt);
    }

    async getProfessorsByCriteria(professorFilter: ProfessorFilterDto): Promise<PaginatedResult<ProfessorResponseDto>> {
        const { page, limit, sortBy, sortOrder } = professorFilter;
        const filter = this.buildFilter(professorFilter);

        const professors = await this.professorModel.paginate(filter, {
            page,
            limit,
            sort: getSort(PROFESSOR_SORT_OPTIONS, DEFAULT_PROFESSOR_SORT_OPTION, sortBy, sortOrder),
            populate: PROFESSOR_POPULATE_OPTIONS.ACADEMIC_PROGRAM,
        });

        return this.professorMapper.toProfessorPaginatedResponseDto(professors);
    }

    async updateProfessor(professorId: string, updateProfessorDto: UpdateProfessorRequestDto): Promise<ProfessorResponseDto> {
        const professor = await this.professorModel.findById(professorId);
        if (!professor) {
            throw new ProfessorNotFoundException();
        }

        await this.userService.validateUniqueFields(updateProfessorDto);

        if (updateProfessorDto.academicProgram) {
            await this.academicProgramService.validateAcademicProgramExists(updateProfessorDto.academicProgram);
        }

        Object.assign(professor, updateProfessorDto);
        await professor.save();
        await professor.populate(PROFESSOR_POPULATE_OPTIONS.ACADEMIC_PROGRAM);

        return this.professorMapper.toProfessorResponseDto(professor);
    }

    async deleteProfessor(professorId: string): Promise<void> {
        const professor = await this.professorModel.findById(professorId);
        if (!professor) {
            throw new ProfessorNotFoundException();
        }
        await professor.softDelete();
    }

    private buildFilter(professorFilter: ProfessorFilterDto): Record<string, any> {
        const filter: Record<string, any> = this.userService.buildFilter(professorFilter);

        if (professorFilter.academicProgram) {
            filter.academicProgram = professorFilter.academicProgram;
        }

        return filter;
    }
}
