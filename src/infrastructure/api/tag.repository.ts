import httpClient from "./http.client";
import type { ITagRepository } from "@/core/repository/ITagRepository";
import type { Tag, TagFormPayload } from "@/core/domain/tag";
import type { ApiResponse } from "@/core/domain/common";

class TagRepository implements ITagRepository {
  async getAll(): Promise<ApiResponse<Tag[]>> {
    const res = await httpClient.get("/tags");
    return res.data;
  }

  async getByID(id: string): Promise<ApiResponse<Tag>> {
    const res = await httpClient.get(`/tags/${id}`);
    return res.data;
  }

  async create(payload: TagFormPayload): Promise<ApiResponse<Tag>> {
    const res = await httpClient.post("/tags", payload);
    return res.data;
  }

  async update(id: string, payload: TagFormPayload): Promise<ApiResponse<Tag>> {
    const res = await httpClient.put(`/tags/${id}`, payload);
    return res.data;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const res = await httpClient.delete(`/tags/${id}`);
    return res.data;
  }
}

export const tagRepository = new TagRepository();
