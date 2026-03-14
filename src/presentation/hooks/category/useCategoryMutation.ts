import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryRepository } from "@/infrastructure/api/category.repository";
import { CATEGORY_QUERY_KEY } from "./useCategories";
import type { CategoryFormPayload } from "@/core/domain/category";

export function useCategoryMutation() {
  const qc = useQueryClient();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: CATEGORY_QUERY_KEY });

  const create = useMutation({
    mutationFn: (payload: CategoryFormPayload) =>
      categoryRepository.create(payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CategoryFormPayload;
    }) => categoryRepository.update(id, payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => categoryRepository.delete(id),
    onSuccess: () => {
      invalidate();
    },
  });

  return { create, update, remove };
}
