import type { Chapter, ChapterFormPayload } from "@/core/domain/chapter";
import type { ApiResponse } from "@/core/domain/common";

export interface IChapterRepository {
  create(
    storyId: string,
    payload: ChapterFormPayload,
  ): Promise<ApiResponse<Chapter>>;
  update(
    storyId: string,
    chapterId: string,
    payload: ChapterFormPayload,
  ): Promise<ApiResponse<Chapter>>;
  delete(storyId: string, chapterId: string): Promise<ApiResponse<null>>;
}
