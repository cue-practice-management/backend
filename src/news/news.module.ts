import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';
import { NewsMapper } from './mappers/news.mapper';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from 'file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
    AuthModule,
    FileModule,
  ],
  providers: [NewsService, NewsMapper],
  controllers: [NewsController],
})
export class NewsModule {}
