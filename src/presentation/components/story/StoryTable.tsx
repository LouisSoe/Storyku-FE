import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, type Column } from "@/presentation/components/ui/Table";
import {
  Badge,
  getCategoryBadgeVariant,
} from "@/presentation/components/ui/Badge";
import { Button } from "@/presentation/components/ui/Button";
import { formatDate } from "@/lib/formatDate";
import type { StoryDetail } from "@/core/domain/story";

interface StoryTableProps {
  data: StoryDetail[];
  loading?: boolean;
  onDelete: (story: StoryDetail) => void;
}

export function StoryTable({ data, loading, onDelete }: StoryTableProps) {
  const navigate = useNavigate();

  const columns: Column<StoryDetail>[] = [
    {
      key: "cover",
      header: "Cover",
      width: "w-16",
      render: (row) =>
        row.cover_url ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${row.cover_url}`}
            alt={row.title}
            className="h-12 w-10 rounded-md object-cover"
          />
        ) : (
          <div className="h-12 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
            N/A
          </div>
        ),
    },
    {
      key: "title",
      header: "Judul / Penulis",
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900 line-clamp-1">
            {row.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{row.author}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) =>
        row.category ? (
          <Badge
            label={row.category.name}
            variant={getCategoryBadgeVariant(row.category.slug)}
          />
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      key: "tags",
      header: "Tags",
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.tags.length === 0 ? (
            <span className="text-gray-400 text-xs">—</span>
          ) : (
            row.tags
              .slice(0, 3)
              .map((tag) => (
                <Badge key={tag.id} label={tag.name} variant="tag" />
              ))
          )}
          {row.tags.length > 3 && (
            <Badge label={`+${row.tags.length - 3}`} variant="default" />
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          label={row.status === "publish" ? "Publish" : "Draft"}
          variant={row.status === "publish" ? "publish" : "draft"}
        />
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
      width: "w-36",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Eye size={13} />}
            onClick={() => navigate(`/stories/${row.id}`)}
          >
            Detail
          </Button>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Pencil size={13} />}
            onClick={() => navigate(`/stories/${row.id}/edit`)}
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
      emptyText="Belum ada story. Klik 'Tambah Story' untuk mulai."
      rowKey={(row) => row.id}
    />
  );
}
