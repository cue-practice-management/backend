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
import { CompanyContractService } from './company-contract.service';
import { GetFile } from '@common/interceptors/file.interceptor';
import { UpdateCompanyContractDto } from './dtos/upload-company-contract.dto';
import { CreateCompanyContractDto } from './dtos/create-company-contract-request.dto';
import { CompanyContractResponseDto } from './dtos/company-contract-response.dto';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly companyContractService: CompanyContractService,
  ) {}

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
  @GetFile()
  async updateCompanyLogo(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<CompanyResponseDto> {
    return this.companyService.updateCompanyLogo(companyId, file);
  }

  @Delete('delete/:companyId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteCompany(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
  ): Promise<void> {
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post(':companyId/contracts')
  @GetFile()
  async createCompanyContract(
    @Param('companyId', ParseObjectIdPipe) companyId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateCompanyContractDto,
  ): Promise<CompanyContractResponseDto> {
    return this.companyContractService.createCompanyContract(
      dto,
      companyId,
      file,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Put('contracts/:contractId')
  @GetFile()
  async updateCompanyContract(
    @Param('contractId', ParseObjectIdPipe) contractId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateCompanyContractDto,
  ): Promise<CompanyContractResponseDto> {
    return this.companyContractService.updateCompanyContract(
      contractId,
      dto,
      file,
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete('contracts/:contractId')
  async deleteCompanyContract(
    @Param('contractId', ParseObjectIdPipe) contractId: string,
  ): Promise<void> {
    return this.companyContractService.deleteCompanyContract(contractId);
  }
}
