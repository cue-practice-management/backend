import { DEFAULT_PAGINATION } from '@common/constants/default-values.constants';
import { SortOrder } from '@common/types/sort-order';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

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

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: SortOrder = 'desc';
}
