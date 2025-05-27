import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequestDto } from './dtos/create-company-request.dto';
import { UpdateCompanyRequestDto } from './dtos/update-company-request.dto';
import { CompanyFilterDto } from './dtos/company-filter.dto';
import { CompanyResponseDto } from './dtos/company-response.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { UserRole } from '@common/enums/role.enum';
import { Roles } from '@common/decorators/role.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFileFilter, multerOptions } from 'file/file.config';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post('create')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async createCompany(
        @Body() dto: CreateCompanyRequestDto,
    ): Promise<CompanyResponseDto> {
        return this.companyService.createCompany(dto);
    }

    @Get(':companyId')
    async getCompanyById(
        @Param('companyId', ParseObjectIdPipe) companyId: string,
    ): Promise<CompanyResponseDto> {
        return this.companyService.getCompanyById(companyId);
    }

    @Put('update/:companyId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async updateCompany(
        @Param('companyId', ParseObjectIdPipe) companyId: string,
        @Body() dto: UpdateCompanyRequestDto,
    ): Promise<CompanyResponseDto> {
        return this.companyService.updateCompany(companyId, dto);
    }

    @Patch('update-logo/:companyId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(
        FileInterceptor('file', {
            ...multerOptions,
            fileFilter: multerFileFilter,
        }),
    )
    async updateCompanyLogo(
        @Param('companyId', ParseObjectIdPipe) companyId: string,
        @UploadedFile('file') file: Express.Multer.File
    ): Promise<CompanyResponseDto> {
        return this.companyService.updateCompanyLogo(companyId, file);
    }

    @Delete('delete/:companyId')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async deleteCompany(@Param('companyId', ParseObjectIdPipe) companyId: string): Promise<void> {
        return this.companyService.deleteCompany(companyId);
    }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.ADMIN)
    async getByCriteria(
        @Query() filter: CompanyFilterDto,
    ): Promise<PaginatedResult<CompanyResponseDto>> {
        return this.companyService.getByCriteria(filter);
    }

    @Get('/typeahead')
    @UseGuards(AuthGuard)
    async getTypeahead(@Query('query') query: string): Promise<TypeaheadItem[]> {
        return this.companyService.getCompanyTypeahead(query);
    }
}
