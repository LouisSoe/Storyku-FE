import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storyRepository } from "@/infrastructure/api/story.repository";
import { chapterRepository } from "@/infrastructure/api/chapter.repository";
import { useDraftStoryStore } from "@/store/draftStoryStore";
import type { StoryFormPayload } from "@/core/domain/story";

export function useStoryMutation() {
  const qc = useQueryClient();
  const { chapters: draftChapters, clearDraft } = useDraftStoryStore();

  const invalidate = () => qc.invalidateQueries({ queryKey: ["stories"] });

  // CREATE: story + semua draft chapter secara atomic
  const create = useMutation({
    mutationFn: async (payload: StoryFormPayload) => {
      const res = await storyRepository.create(payload);
      const storyId = res.data.id;

      // POST setiap draft chapter berurutan
      for (const chapter of draftChapters) {
        await chapterRepository.create(storyId, {
          title: chapter.title,
          content: chapter.content,
        });
      }

      return res;
    },
    onSuccess: () => {
      clearDraft();
      invalidate();
    },
  });

  // UPDATE: story saja (chapter sudah punya ID, dihandle sendiri)
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StoryFormPayload }) =>
      storyRepository.update(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["story", id] });
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => storyRepository.delete(id),
    onSuccess: () => {
      invalidate();
    },
  });

  return { create, update, remove };
}
