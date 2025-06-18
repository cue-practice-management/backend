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
import { ProfessorService } from './professor.service';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { ProfessorResponseDto } from './dtos/profesor-response.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateProfessorRequestDto } from './dtos/update-professor-request.dto';
import { ProfessorFilterDto } from './dtos/professor-filter.dto';
import { CreateProfessorRequestDto } from './dtos/create-professor-request.dto';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createprofessor(
    @Body() createprofessorDto: CreateProfessorRequestDto,
  ): Promise<ProfessorResponseDto> {
    return await this.professorService.createProfessor(createprofessorDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getprofessorsByCriteria(@Query() filter: ProfessorFilterDto) {
    return await this.professorService.getProfessorsByCriteria(filter);
  }

  @Get('/me')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.PROFESSOR)
  async getMyProfile(
    @CurrentUser() professorId: string,
  ): Promise<ProfessorResponseDto> {
    return await this.professorService.getProfessorById(professorId);
  }

  @Get('/typeahead')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getprofessorsTypeahead(
    @Query('query') query: string,
  ): Promise<TypeaheadItem[]> {
    return await this.professorService.getProfessorsTypeahead(query);
  }

  @Put('update/:professorId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateprofessor(
    @Param('professorId', ParseObjectIdPipe) professorId: string,
    @Body() updateprofessorDto: UpdateProfessorRequestDto,
  ): Promise<ProfessorResponseDto> {
    return await this.professorService.updateProfessor(
      professorId,
      updateprofessorDto,
    );
  }

  @Delete('delete/:professorId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteprofessor(
    @Param('professorId', ParseObjectIdPipe) professorId: string,
  ) {
    return await this.professorService.deleteProfessor(professorId);
  }
}
