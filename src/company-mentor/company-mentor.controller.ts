import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyMentorService } from './company-mentor.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CompanyMentorResponseDto } from './dtos/company-mentor-response.dto';
import { CreateCompanyMentorRequestDto } from './dtos/create-company-mentor.dto copy';
import { CompanyMentorFilterDto } from './dtos/company-mentor-filter.dto';
import { UpdateCompanyMentorRequestDto } from './dtos/update-company-mentor.dto';

@Controller('company-mentors')
export class CompanyMentorController {
  constructor(private readonly companyMentorService: CompanyMentorService) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createCompanyMentor(
    @Body() dto: CreateCompanyMentorRequestDto,
  ): Promise<CompanyMentorResponseDto> {
    return await this.companyMentorService.createCompanyMentor(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getCompanyMentorsByCriteria(
    @Query() filter: CompanyMentorFilterDto,
  ) {
    return await this.companyMentorService.getCompanyMentorsByCriteria(filter);
  }

  @Put('update/:mentorId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateCompanyMentor(
    @Param('mentorId', ParseObjectIdPipe) mentorId: string,
    @Body() dto: UpdateCompanyMentorRequestDto,
  ): Promise<CompanyMentorResponseDto> {
    return await this.companyMentorService.updateCompanyMentor(
      mentorId,
      dto,
    );
  }

  @Delete('delete/:mentorId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompanyMentor(
    @Param('mentorId', ParseObjectIdPipe) mentorId: string,
  ) {
    await this.companyMentorService.deleteCompanyMentor(mentorId);
  }
}
