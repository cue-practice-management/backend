import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { CompanyMentor, CompanyMentorDocument } from './schemas/company-mentor.schema';
import { UserService } from '@user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '@user/schemas/user.schema';
import { CompanyMentorMapper } from './mappers/company-mentor.mapper';
import { CompanyService } from 'company/company.service';
import { UserRole } from '@common/enums/role.enum';
import { CreateCompanyMentorRequestDto } from './dtos/create-company-mentor.dto copy';
import { CompanyMentorResponseDto } from './dtos/company-mentor-response.dto';
import * as bcrypt from 'bcryptjs';
import { COMPANY_MENTOR_POPULATE_OPTIONS, COMPANY_MENTOR_SORT_OPTIONS, DEFAULT_COMPANY_MENTOR_SORT_OPTION } from './constants/company-mentor.constants';
import { CompanyMentorFilterDto } from './dtos/company-mentor-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { CompanyFilterDto } from 'company/dtos/company-filter.dto';
import { getSort } from '@common/utils/pagination.util';
import { UpdateCompanyContractDto } from 'company/dtos/update-company-contract.dto';
import { CompanyMentorNotFoundException } from './exceptions/company-mentor-not-found.exception';
import { UpdateCompanyMentorRequestDto } from './dtos/update-company-mentor.dto';


@Injectable()
export class CompanyMentorService {
    private readonly companyMentorModel: PaginateModel<CompanyMentorDocument>;

    constructor(
        @InjectModel(CompanyMentor.name)
        private readonly userModel: PaginateModel<UserDocument>,
        private readonly userService: UserService,
        private readonly companyService: CompanyService,
        private readonly companyMentorMapper: CompanyMentorMapper,
    ) {
        this.companyMentorModel = this.userModel.discriminators?.[UserRole.COMPANY_MENTOR] as PaginateModel<CompanyMentorDocument>;
    }

    async createCompanyMentor(createCompanyMentorDto: CreateCompanyMentorRequestDto): Promise<CompanyMentorResponseDto> {
        const companyMentor = new this.companyMentorModel({
            role: UserRole.COMPANY_MENTOR,
            password: this.generateCompanyMentorPassword(createCompanyMentorDto.documentNumber),
            ...createCompanyMentorDto,
        });

        await this.userService.validateUniqueFields(createCompanyMentorDto);
        await this.companyService.validateCompanyExists(createCompanyMentorDto.company);

        await companyMentor.save();
        await companyMentor.populate([
            COMPANY_MENTOR_POPULATE_OPTIONS.COMPANY
        ]);

        return this.companyMentorMapper.toCompanyMentorResponseDto(companyMentor);
    }

    async getCompanyMentorsByCriteria(
        companyMentorFilter: CompanyMentorFilterDto
    ): Promise<PaginatedResult<CompanyMentorResponseDto>> {
        const { page, limit, sortBy, sortOrder } = companyMentorFilter;
        const filter = this.buildFilter(companyMentorFilter);

        const companyMentors = await this.companyMentorModel.paginate(filter, {
            page,
            limit,
            sort: getSort(
                COMPANY_MENTOR_SORT_OPTIONS,
                DEFAULT_COMPANY_MENTOR_SORT_OPTION,
                sortBy,
                sortOrder
            ),
            populate: [COMPANY_MENTOR_POPULATE_OPTIONS.COMPANY]
        });

        return this.companyMentorMapper.toCompanyMentorPaginatedResponseDto(companyMentors);
    }

    async updateCompanyMentor(
        companyMentorId: string,
        updateCompanyMentorDto: UpdateCompanyMentorRequestDto
    ): Promise<CompanyMentorResponseDto> {
        const companyMentor = await this.companyMentorModel.findById(companyMentorId);
        if (!companyMentor) {
            throw new CompanyMentorNotFoundException();
        }

        await this.userService.validateUniqueFields(updateCompanyMentorDto);
        if (updateCompanyMentorDto.company) {
            await this.companyService.validateCompanyExists(updateCompanyMentorDto.company);
        }

        Object.assign(companyMentor, updateCompanyMentorDto);
        await companyMentor.save();
        await companyMentor.populate([COMPANY_MENTOR_POPULATE_OPTIONS.COMPANY]);

        return this.companyMentorMapper.toCompanyMentorResponseDto(companyMentor);
    }

    async deleteCompanyMentor(companyMentorId: string): Promise<void> {
        const companyMentor = await this.companyMentorModel.findById(companyMentorId);
        if (!companyMentor) {
            throw new CompanyMentorNotFoundException();
        }
        await companyMentor.softDelete();
    }


    private generateCompanyMentorPassword(documentNumber: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(documentNumber, salt);
    }


    private buildFilter(filter: CompanyMentorFilterDto): Record<string, any> {
        const filterObject: Record<string, any> = this.userService.buildFilter(filter);

        if (filter.company) {
            filterObject.company = filter.company;
        }

        if (filter.position) {
            filterObject.position = { $regex: filter.position, $options: 'i' };
        }

        return filterObject;
    }
}
