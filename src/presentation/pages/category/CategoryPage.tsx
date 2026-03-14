import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/presentation/components/ui/Button";
import { CategoryTable } from "@/presentation/components/category/CategoryTable";
import { CategoryFormModal } from "@/presentation/components/category/CategoryFormModal";
import { useCategories } from "@/presentation/hooks/category/useCategories";
import { useCategoryMutation } from "@/presentation/hooks/category/useCategoryMutation";
import { useConfirm } from "@/presentation/hooks/useConfirm";
import type { Category } from "@/core/domain/category";

export function CategoryPage() {
  const { data, isLoading } = useCategories();
  const { create, update, remove } = useCategoryMutation();
  const { confirm } = useConfirm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);

  const categories = data?.data ?? [];

  const handleOpenAdd = () => {
    setEditTarget(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditTarget(category);
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

  const handleDelete = async (category: Category) => {
    const confirmed = await confirm(
      `Hapus category "${category.name}"?`,
      "Story yang menggunakan category ini akan kehilangan kategorinya.",
    );
    if (!confirmed) return;

    toast.promise(remove.mutateAsync(category.id), {
      loading: "Menghapus category...",
      success: "Category berhasil dihapus",
      error: "Gagal menghapus category",
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Category Management
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {categories.length} category terdaftar
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={handleOpenAdd}>
          Tambah Category
        </Button>
      </div>

      {/* Table */}
      <CategoryTable
        data={categories}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isLoading={create.isPending || update.isPending}
        editData={editTarget}
      />
    </div>
  );
}
