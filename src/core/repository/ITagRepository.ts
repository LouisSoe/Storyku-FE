import type { Tag, TagFormPayload } from "@/core/domain/tag";
import type { ApiResponse } from "@/core/domain/common";

export interface ITagRepository {
  getAll(): Promise<ApiResponse<Tag[]>>;
  getByID(id: string): Promise<ApiResponse<Tag>>;
  create(payload: TagFormPayload): Promise<ApiResponse<Tag>>;
  update(id: string, payload: TagFormPayload): Promise<ApiResponse<Tag>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
