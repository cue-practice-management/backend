import { SortOrder } from '@common/types/sort-order';

const ASC_NUMBER = 1;
const DESC_NUMBER = -1;
const DEFAULT_SORT_NUMBER = ASC_NUMBER;

export function getSortDirection(sort?: SortOrder): 1 | -1 {
  if (!sort) {
    return DEFAULT_SORT_NUMBER;
  }

  return sort === 'asc' ? ASC_NUMBER : DESC_NUMBER;
}

export function getSort(
  sortOptions: string[],
  defaultSortOption: string,
  option?: string,
  sortOrder?: SortOrder,
): Record<string, 1 | -1> {
  const validatedSortBy =
    sortOptions.find((option) => option === option) || defaultSortOption;
  const sort = {
    [validatedSortBy]: getSortDirection(sortOrder),
  };

  return sort;
}
