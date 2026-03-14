import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/presentation/components/ui/Button";
import { TagTable } from "@/presentation/components/tag/TagTable";
import { TagFormModal } from "@/presentation/components/tag/TagFormModal";
import { useTags } from "@/presentation/hooks/tag/useTags";
import { useTagMutation } from "@/presentation/hooks/tag/useTagMutation";
import { useConfirm } from "@/presentation/hooks/useConfirm";
import type { Tag } from "@/core/domain/tag";

export function TagPage() {
  const { data, isLoading } = useTags();
  const { create, update, remove } = useTagMutation();
  const { confirm } = useConfirm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Tag | null>(null);

  const tags = data?.data ?? [];

  const handleOpenAdd = () => {
    setEditTarget(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tag: Tag) => {
    setEditTarget(tag);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditTarget(null);
  };

  const handleSubmit = async (name: string) => {
    if (editTarget) {
      await update.mutateAsync({ id: editTarget.id, payload: { name } });
    } else {
      await create.mutateAsync({ name });
    }
    handleClose();
  };

  const handleDelete = async (tag: Tag) => {
    const confirmed = await confirm(
      `Hapus tag "${tag.name}"?`,
      "Tag ini akan dihapus dari semua story yang menggunakannya.",
    );
    if (!confirmed) return;

    toast.promise(remove.mutateAsync(tag.id), {
      loading: "Menghapus tag...",
      success: "Tag berhasil dihapus",
      error: "Gagal menghapus tag",
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tag Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {tags.length} tag terdaftar
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={handleOpenAdd}>
          Tambah Tag
        </Button>
      </div>

      {/* Table */}
      <TagTable
        data={tags}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <TagFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isLoading={create.isPending || update.isPending}
        editData={editTarget}
      />
    </div>
  );
}
