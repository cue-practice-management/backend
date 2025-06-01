export class NewsResponseDto {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
