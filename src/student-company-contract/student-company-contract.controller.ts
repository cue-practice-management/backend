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
} from '@nestjs/common';
import { StudentCompanyContractService } from './student-company-contract.service';
import { CreateStudentCompanyContractRequestDto } from './dtos/create-student-company-contract-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { GetFile } from '@common/interceptors/file.interceptor';
import { StudentCompanyContractResponseDto } from './dtos/student-company-contract-response.dto';
import { StudentCompanyContractFilter } from './dtos/student-company-contract-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ActivateStudentCompanyContractRequestDto } from './dtos/activate-student-company-contract-request.dto';
import { CancelStudentCompanyContractRequestDto } from './dtos/cancel-student-company-contract-request.dto';

@Controller('student-company-contracts')
export class StudentCompanyContractController {
  constructor(
    private readonly contractService: StudentCompanyContractService,
  ) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post('/create')
  @GetFile()
  async createStudentCompanyContract(
    @Body() dto: CreateStudentCompanyContractRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<StudentCompanyContractResponseDto> {
    return this.contractService.createStudentCompanyContract(dto, file);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getByCriteria(
    @Query() filter: StudentCompanyContractFilter,
  ): Promise<PaginatedResult<StudentCompanyContractResponseDto>> {
    return this.contractService.getStudentCompanyContractsByCriteria(filter);
  }

  @Patch(':contractId/activate')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @GetFile()
  async activateStudentCompanyContract(
    @Param('contractId', ParseObjectIdPipe) contractId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ActivateStudentCompanyContractRequestDto,
  ): Promise<StudentCompanyContractResponseDto> {
    return this.contractService.activateStudentCompanyContract(
      contractId,
      dto,
      file,
    );
  }

  @Patch(':contractId/cancel')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async cancelStudentCompanyContract(
    @Param('contractId', ParseObjectIdPipe) contractId: string,
    @Body() dto: CancelStudentCompanyContractRequestDto,
  ): Promise<StudentCompanyContractResponseDto> {
    return this.contractService.cancelStudentCompanyContract(contractId, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:contractId')
  async deleteContract(
    @Param('contractId', ParseObjectIdPipe) contractId: string,
  ): Promise<void> {
    return this.contractService.deleteStudentCompanyContract(contractId);
  }
}
