import httpClient from "./http.client";
import type { ICategoryRepository } from "@/core/repository/ICategoryRepository";
import type { Category, CategoryFormPayload } from "@/core/domain/category";
import type { ApiResponse } from "@/core/domain/common";

class CategoryRepository implements ICategoryRepository {
  async getAll(): Promise<ApiResponse<Category[]>> {
    const res = await httpClient.get("/categories");
    return res.data;
  }

  async getByID(id: string): Promise<ApiResponse<Category>> {
    const res = await httpClient.get(`/categories/${id}`);
    return res.data;
  }

  async create(payload: CategoryFormPayload): Promise<ApiResponse<Category>> {
    const res = await httpClient.post("/categories", payload);
    return res.data;
  }

  async update(
    id: string,
    payload: CategoryFormPayload,
  ): Promise<ApiResponse<Category>> {
    const res = await httpClient.put(`/categories/${id}`, payload);
    return res.data;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const res = await httpClient.delete(`/categories/${id}`);
    return res.data;
  }
}

export const categoryRepository = new CategoryRepository();
