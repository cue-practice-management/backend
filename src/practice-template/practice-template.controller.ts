import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PracticeTemplateService } from './practice-template.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { UserRole } from '@common/enums/role.enum';
import { Roles } from '@common/decorators/role.decorator';
import { CreatePracticeTemplateRequestDto } from './dtos/create-practice-template-request.dto';
import { PracticeTemplateResponseDto } from './dtos/practice-template-response.dto';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { PracticeTemplateFilterDto } from './dtos/practice-template-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdatePracticeTemplateRequestDto } from './dtos/update-practice-template-request.dto';

@Controller('practice-templates')
export class PracticeTemplateController {
  constructor(
    private readonly service: PracticeTemplateService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async create(
    @Body() dto: CreatePracticeTemplateRequestDto,
  ): Promise<PracticeTemplateResponseDto> {
    return this.service.createTemplate(dto);
  }

  @Get('typeahead')
  @UseGuards(AuthGuard)
  async getTypeahead(
    @Query('query') query: string,
  ): Promise<TypeaheadItem[]> {
    return this.service.getTypeahead(query);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getByCriteria(
    @Query() filter: PracticeTemplateFilterDto,
  ): Promise<PaginatedResult<PracticeTemplateResponseDto>> {
    return this.service.getByCriteria(filter);
  }

  @Get(':templateId')
  @UseGuards(AuthGuard)
  async getById(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
  ): Promise<PracticeTemplateResponseDto> {
    return this.service.getTemplateById(templateId);
  }

  @Put('update/:templateId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
    @Body() dto: UpdatePracticeTemplateRequestDto,
  ): Promise<PracticeTemplateResponseDto> {
    return this.service.updateTemplate(templateId, dto);
  }

  @Delete('delete/:templateId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async remove(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
  ): Promise<void> {
    return this.service.deleteTemplate(templateId);
  }
}
