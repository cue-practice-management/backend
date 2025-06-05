import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { News, NewsDocument } from '../schemas/news.schema';
import { NewsResponseDto } from 'news/dtos/news-response.dto';
import { PaginatedResult } from '@common/types/paginated-result';

@Injectable()
export class NewsMapper {
  toNewsResponseDto(news: News): NewsResponseDto {
    return {
      _id: news._id.toString(),
      title: news.title,
      summary: news.summary,
      content: news.content,
      coverImageUrl: news.coverImageUrl,
      tags: news.tags,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
    };
  }

  toNewsResponsePaginatedDto(
    paginatedResult: PaginateResult<NewsDocument>,
  ): PaginatedResult<NewsResponseDto> {
    return {
      docs: paginatedResult.docs.map((news) =>
        this.toNewsResponseDto(news),
      ),
      totalDocs: paginatedResult.totalDocs,
      totalPages: paginatedResult.totalPages,
      page: paginatedResult.page,
      limit: paginatedResult.limit,
    };
  }
}
