import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { PaginatedResult } from '@common/types/paginated-result';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePracticeTemplateFormatRequestDto } from 'practice-template/dtos/create-practice-template-format-request.dto';
import { PracticeTemplateFormatFilterDto } from 'practice-template/dtos/practice-template-format-filter.dto';
import { PracticeTemplateFormatResponseDto } from 'practice-template/dtos/practice-template-format-response.dto';
import { UpdatePracticeTemplateFormatRequestDto } from 'practice-template/dtos/update-practice-template-format-request.dto';
import { PracticeTemplateFormatService } from 'practice-template/services/practice-template-format.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('practice-templates/:templateId/formats')
export class PracticeTemplateFormatController {
  constructor(
    private readonly practiceTemplateFormatService: PracticeTemplateFormatService,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getByCriteria(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
    @Query() filter: PracticeTemplateFormatFilterDto,
  ): Promise<PaginatedResult<PracticeTemplateFormatResponseDto>> {
    filter.template = templateId;
    return this.practiceTemplateFormatService.getPracticeTemplateFormatsByCriteria(filter);
  }

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
    @Body() dto: CreatePracticeTemplateFormatRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PracticeTemplateFormatResponseDto> {
    dto.template = templateId;
    return this.practiceTemplateFormatService.createPracticeTemplateFormat(dto, file);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdatePracticeTemplateFormatRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PracticeTemplateFormatResponseDto> {
    return this.practiceTemplateFormatService.updatePracticeTemplateFormat(id, dto, file);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async remove(
    @Param('templateId', ParseObjectIdPipe) templateId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<void> {
    return this.practiceTemplateFormatService.deletePracticeTemplateFormat(id);
  }
}
