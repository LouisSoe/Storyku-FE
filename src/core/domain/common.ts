export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: Meta;
}
