import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagRepository } from "@/infrastructure/api/tag.repository";
import { TAG_QUERY_KEY } from "./useTags";
import type { TagFormPayload } from "@/core/domain/tag";

export function useTagMutation() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: TAG_QUERY_KEY });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
  }
  const create = useMutation({
    mutationFn: (payload: TagFormPayload) => tagRepository.create(payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TagFormPayload }) =>
      tagRepository.update(id, payload),
    onSuccess: () => {
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => tagRepository.delete(id),
    onSuccess: () => {
      invalidate();
    },
  });

  return { create, update, remove };
}
