import type {
    Story,
  StoryDetail,
  StoryFilter,
  StoryFormPayload,
} from "@/core/domain/story";
import type { PaginatedResponse, ApiResponse } from "@/core/domain/common";

export interface IStoryRepository {
  getAll(filter: StoryFilter): Promise<PaginatedResponse<StoryDetail>>;
  getByID(id: string): Promise<ApiResponse<StoryDetail>>;
  create(payload: StoryFormPayload): Promise<ApiResponse<Story>>;
  update(id: string, payload: StoryFormPayload): Promise<ApiResponse<Story>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
