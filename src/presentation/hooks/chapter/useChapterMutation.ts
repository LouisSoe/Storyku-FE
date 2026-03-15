import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chapterRepository } from "@/infrastructure/api/chapter.repository";
import type { ChapterFormPayload } from "@/core/domain/chapter";

export function useChapterMutation(storyId: string) {
  const qc = useQueryClient();
  const invalidate = () => {
      qc.invalidateQueries({ queryKey: ["story", storyId] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
  }
    

  const create = useMutation({
    mutationFn: (payload: ChapterFormPayload) =>
      chapterRepository.create(storyId, payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: ({
      chapterId,
      payload,
    }: {
      chapterId: string;
      payload: ChapterFormPayload;
    }) => chapterRepository.update(storyId, chapterId, payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: (chapterId: string) =>
      chapterRepository.delete(storyId, chapterId),
    onSuccess: () => {
      invalidate();
    },
  });

  return { create, update, remove };
}
