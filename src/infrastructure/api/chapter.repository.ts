import httpClient from "./http.client";
import type { IChapterRepository } from "@/core/repository/IChapterRepository";
import type { Chapter, ChapterFormPayload } from "@/core/domain/chapter";
import type { ApiResponse } from "@/core/domain/common";

class ChapterRepository implements IChapterRepository {
  async create(
    storyId: string,
    payload: ChapterFormPayload,
  ): Promise<ApiResponse<Chapter>> {
    const res = await httpClient.post(`/stories/${storyId}/chapters`, payload);
    return res.data;
  }

  async update(
    storyId: string,
    chapterId: string,
    payload: ChapterFormPayload,
  ): Promise<ApiResponse<Chapter>> {
    const res = await httpClient.put(
      `/stories/${storyId}/chapters/${chapterId}`,
      payload,
    );
    return res.data;
  }

  async delete(storyId: string, chapterId: string): Promise<ApiResponse<null>> {
    const res = await httpClient.delete(
      `/stories/${storyId}/chapters/${chapterId}`,
    );
    return res.data;
  }
}

export const chapterRepository = new ChapterRepository();
