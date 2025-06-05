import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { StudentCompanyLinkingProcessService } from './student-company-linking-process.service';
import { CreateStudentCompanyLinkingProcessRequestDto } from './dtos/create-student-company-linking-process-request.dto';
import { StudentCompanyLinkingProcessResponseDto } from './dtos/student-company-linking-process-response.dto';
import { StudentCompanyLinkingProcessFilterDto } from './dtos/student-company-linking-process-filter.dto';
import { UpdateStudentCompanyLinkingProcessStatusRequestDto } from './dtos/update-student-company-linking-process-status-request.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { UserRole } from '@common/enums/role.enum';
import { Roles } from '@common/decorators/role.decorator';

@Controller('student-company-linking-processes')
export class StudentCompanyLinkingProcessController {
  constructor(private readonly service: StudentCompanyLinkingProcessService) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateStudentCompanyLinkingProcessRequestDto,
  ): Promise<StudentCompanyLinkingProcessResponseDto> {
    return this.service.createStudentCompanyLinkingProcess(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async findByCriteria(@Query() filter: StudentCompanyLinkingProcessFilterDto) {
    return this.service.getStudentCompanyLinkingProcessByCriteria(filter);
  }

  @Patch('update/:id/status')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStudentCompanyLinkingProcessStatusRequestDto,
  ): Promise<StudentCompanyLinkingProcessResponseDto> {
    return this.service.updateStudentCompanyLinkingProcessStatus(id, dto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.deleteStudentCompanyLinkingProcess(id);
  }
}
