import { useQuery } from "@tanstack/react-query";
import { tagRepository } from "@/infrastructure/api/tag.repository";

export const TAG_QUERY_KEY = ["tags"] as const;

export function useTags() {
  return useQuery({
    queryKey: TAG_QUERY_KEY,
    queryFn: () => tagRepository.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}
