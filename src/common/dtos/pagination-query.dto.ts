import { DEFAULT_PAGINATION } from '@common/constants/default-values.constants';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(DEFAULT_PAGINATION.MIN_PAGE)
    page: number = DEFAULT_PAGINATION.PAGE;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(DEFAULT_PAGINATION.MIN_LIMIT)
    limit: number = DEFAULT_PAGINATION.LIMIT;
}
