import { useQuery } from "@tanstack/react-query";
import { storyRepository } from "@/infrastructure/api/story.repository";
import type { StoryFilter } from "@/core/domain/story";

export const STORY_QUERY_KEY = (filter: StoryFilter) =>
  ["stories", filter] as const;

export function useStories(filter: StoryFilter) {
  return useQuery({
    queryKey: STORY_QUERY_KEY(filter),
    queryFn: () => storyRepository.getAll(filter),
    placeholderData: (prev) => prev, // pertahankan data lama saat filter berubah
  });
}
