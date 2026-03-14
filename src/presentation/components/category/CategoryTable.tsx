import { Pencil, Trash2 } from "lucide-react";
import { Table, type Column } from "@/presentation/components/ui/Table";
import { Button } from "@/presentation/components/ui/Button";
import { formatDate } from "@/lib/formatDate";
import type { Category } from "@/core/domain/category";

interface CategoryTableProps {
  data: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({
  data,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Nama",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (row) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
          {row.slug}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Dibuat",
      render: (row) => (
        <span className="text-gray-500 text-sm">
          {formatDate(row.created_at)}
        </span>
      ),
    },
    {
      key: "action",
      header: "Aksi",
      width: "w-28",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Pencil size={13} />}
            onClick={() => onEdit(row)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            leftIcon={<Trash2 size={13} />}
            onClick={() => onDelete(row)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      emptyText="Belum ada category"
      rowKey={(row) => row.id}
    />
  );
}
