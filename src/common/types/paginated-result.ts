export class PaginatedResult<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number | undefined;
  limit: number;
}
