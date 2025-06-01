import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { PaginateModel } from 'mongoose';
import { NewsMapper } from './mappers/news.mapper';
import { CreateNewsRequestDto } from './dtos/create-news-request.dto';
import { NewsResponseDto } from './dtos/news-response.dto';
import { NewsNotFoundException } from './exceptions/news-not-found.exception';
import { NewsFilterDto } from './dtos/news-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { DEFAULT_NEWS_SORT_OPTION, NEWS_SORT_OPTIONS } from './constants/news.constants';
import { PaginateResult } from 'mongoose';
import { UpdateNewsRequestDto } from './dtos/update-news-request.dto';
import { FileService } from 'file/file.service';
import { FILE_FOLDERS } from 'file/constants/file.constants';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: PaginateModel<NewsDocument>,
        private readonly newsMapper: NewsMapper,
        private readonly fileService: FileService
    ) { }

    async createNews(
        dto: CreateNewsRequestDto,
        file: Express.Multer.File,
    ): Promise<NewsResponseDto> {

        const fileUrl = await this.fileService.uploadFile({
            file,
            isPublic: true,
            folder: FILE_FOLDERS.NEWS,
        });

        const news = new this.newsModel(
            {
                ...dto,
                coverImageUrl: fileUrl.fileUrl,
            }
        );

        await news.save();
        return this.newsMapper.toNewsResponseDto(news);
    }

    async getNewsById(newsId: string): Promise<NewsResponseDto> {
        const news = await this.newsModel.findById(newsId);
        if (!news) {
            throw new NewsNotFoundException();
        }
        return this.newsMapper.toNewsResponseDto(news);
    }

    async getNewsByCriteria(
        filter: NewsFilterDto,
    ): Promise<PaginatedResult<NewsResponseDto>> {
        const { page, limit, sortBy, sortOrder } = filter;
        const query = this.buildFilterQuery(filter);
        const sort = getSort(
            NEWS_SORT_OPTIONS,
            DEFAULT_NEWS_SORT_OPTION,
            sortBy,
            sortOrder,
        );

        const result: PaginateResult<NewsDocument> = await this.newsModel.paginate(query, {
            page,
            limit,
            sort,
        });

        return this.newsMapper.toNewsResponsePaginatedDto(result);
    }

    async updateNews(
        newsId: string,
        dto: UpdateNewsRequestDto,
        file?: Express.Multer.File,
    ): Promise<NewsResponseDto> {
        const news = await this.newsModel.findById(newsId);
        if (!news) {
            throw new NewsNotFoundException();
        }

        if (file) {
            if (news.coverImageUrl) {
                const fileKey = this.fileService.getFileKeyFromUrl(news.coverImageUrl);
                await this.fileService.deleteFile(fileKey, true);
            }
            const fileUploaded = await this.fileService.uploadFile({
                file,
                isPublic: true,
                folder: FILE_FOLDERS.NEWS,
            });

            news.coverImageUrl = fileUploaded.fileUrl;
        }

        Object.assign(news, dto);
        await news.save();

        return this.newsMapper.toNewsResponseDto(news);
    }

    async deleteNews(newsId: string): Promise<void> {
        const news = await this.newsModel.findById(newsId);
        if (!news) {
            throw new NewsNotFoundException();
        }

        news.softDelete();
    }

    private buildFilterQuery(filter: NewsFilterDto): Record<string, any> {
        const query: Record<string, any> = {};

        if (filter.title) {
            query.title = new RegExp(filter.title, 'i');
        }

        if (filter.tags?.length) {
            query.tags = { $in: filter.tags };
        }

        return query;
    }
}