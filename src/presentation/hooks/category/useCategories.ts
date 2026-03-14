import { useQuery } from "@tanstack/react-query";
import { categoryRepository } from "@/infrastructure/api/category.repository";

export const CATEGORY_QUERY_KEY = ["categories"] as const;

export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: () => categoryRepository.getAll(),
    staleTime: 5 * 60 * 1000, // 5 menit — data master jarang berubah
  });
}
