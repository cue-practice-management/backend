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
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CreateNewsRequestDto } from './dtos/create-news-request.dto';
import { NewsFilterDto } from './dtos/news-filter.dto';
import { UpdateNewsRequestDto } from './dtos/update-news-request.dto';
import { GetFile } from '@common/interceptors/file.interceptor';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @GetFile()
  async createNews(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateNewsRequestDto,
  ) {
    return this.newsService.createNews(dto, file);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getNewsByCriteria(@Query() filter: NewsFilterDto) {
    return await this.newsService.getNewsByCriteria(filter);
  }

  @Get(':newsId')
  @UseGuards(AuthGuard)
  async getNewsById(@Param('newsId', ParseObjectIdPipe) newsId: string) {
    return await this.newsService.getNewsById(newsId);
  }

  @Put('update/:newsId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @GetFile()
  async updateNews(
    @Param('newsId', ParseObjectIdPipe) newsId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateNewsRequestDto,
  ) {
    return await this.newsService.updateNews(newsId, dto, file);
  }

  @Delete('delete/:newsId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteNews(@Param('newsId', ParseObjectIdPipe) newsId: string) {
    await this.newsService.deleteNews(newsId);
  }
}
