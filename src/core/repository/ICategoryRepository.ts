import type { Category, CategoryFormPayload } from "@/core/domain/category";
import type { ApiResponse } from "@/core/domain/common";

export interface ICategoryRepository {
  getAll(): Promise<ApiResponse<Category[]>>;
  getByID(id: string): Promise<ApiResponse<Category>>;
  create(payload: CategoryFormPayload): Promise<ApiResponse<Category>>;
  update(
    id: string,
    payload: CategoryFormPayload,
  ): Promise<ApiResponse<Category>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
