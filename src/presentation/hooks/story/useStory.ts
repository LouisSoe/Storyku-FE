import { useQuery } from "@tanstack/react-query";
import { storyRepository } from "@/infrastructure/api/story.repository";

export const STORY_DETAIL_KEY = (id: string) => ["story", id] as const;

export function useStory(id: string) {
  return useQuery({
    queryKey: STORY_DETAIL_KEY(id),
    queryFn: () => storyRepository.getByID(id),
    enabled: !!id,
  });
}
