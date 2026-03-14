// src/presentation/components/story/ChapterTable.tsx
import { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, type Column } from "@/presentation/components/ui/Table";
import { Button } from "@/presentation/components/ui/Button";
import { ChapterPreviewModal } from "@/presentation/components/chapter/ChapterPreviewModal";
import { formatDate } from "@/lib/formatDate";
import type { Chapter } from "@/core/domain/chapter";
import type { DraftChapter } from "@/store/draftStoryStore";

interface DraftChapterTableProps {
  mode: "draft";
  data: DraftChapter[];
  storyId?: never;
  onEditDraft: (chapter: DraftChapter) => void;
  onDeleteDraft: (localId: string) => void;
  readOnly?: never;
}

interface SavedChapterTableProps {
  mode: "saved";
  data: Chapter[];
  storyId: string;
  onDeleteSaved: (chapter: Chapter) => void;
  onEditDraft?: never;
  onDeleteDraft?: never;
  readOnly?: boolean;
}

type ChapterTableProps = DraftChapterTableProps | SavedChapterTableProps;

export function ChapterTable(props: ChapterTableProps) {
  const navigate = useNavigate();
  const [previewChapter, setPreviewChapter] = useState<Chapter | null>(null);

  // ─── Mode Draft ────────────────────────────────────────────────────────────
  if (props.mode === "draft") {
    const { data, onEditDraft, onDeleteDraft } = props;

    const columns: Column<DraftChapter>[] = [
      {
        key: "title",
        header: "Judul Chapter",
        render: (row) => (
          <span className="font-medium text-gray-900">{row.title}</span>
        ),
      },
      {
        key: "content",
        header: "Konten",
        render: (row) => (
          // Tampilkan preview teks tanpa HTML tag
          <span className="text-gray-400 text-xs line-clamp-1">
            {row.content
              ? row.content.replace(/<[^>]+>/g, "").slice(0, 80) || "—"
              : "—"}
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
              variant="secondary"
              leftIcon={<Pencil size={13} />}
              onClick={() => onEditDraft(row)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              leftIcon={<Trash2 size={13} />}
              onClick={() => onDeleteDraft(row.localId)}
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
        emptyText="Belum ada chapter. Klik 'New Chapter' untuk menambahkan."
        rowKey={(row) => row.localId}
      />
    );
  }

  // ─── Mode Saved ────────────────────────────────────────────────────────────
  const { data, storyId, onDeleteSaved, readOnly } = props;

  const savedColumns: Column<Chapter>[] = [
    {
      key: "order_index",
      header: "#",
      width: "w-10",
      render: (row) => (
        <span className="text-gray-400 text-sm">{row.order_index + 1}</span>
      ),
    },
    {
      key: "title",
      header: "Judul Chapter",
      render: (row) => (
        <span className="font-medium text-gray-900">{row.title}</span>
      ),
    },
    {
      key: "content",
      header: "Konten",
      render: (row) => (
        <span className="text-gray-400 text-xs line-clamp-1">
          {row.content
            ? row.content.replace(/<[^>]+>/g, "").slice(0, 80) || "—"
            : "—"}
        </span>
      ),
    },
    {
      key: "updated_at",
      header: "Terakhir Diperbarui",
      width: "w-36",
      render: (row) => (
        <span className="text-gray-500 text-sm">
          {formatDate(row.updated_at)}
        </span>
      ),
    },
    {
      key: "action",
      header: "Aksi",
      width: readOnly ? "w-20" : "w-44",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<Eye size={13} />}
            onClick={() => setPreviewChapter(row)}
          >
            Lihat
          </Button>

          {/* Edit & Hapus — hanya tampil jika tidak readOnly */}
          {!readOnly && (
            <>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Pencil size={13} />}
                onClick={() =>
                  navigate(`/stories/${storyId}/chapters/${row.id}/edit`)
                }
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                leftIcon={<Trash2 size={13} />}
                onClick={() => onDeleteSaved(row)}
              >
                Hapus
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={savedColumns}
        data={data}
        emptyText="Belum ada chapter."
        rowKey={(row) => row.id}
      />

      <ChapterPreviewModal
        isOpen={!!previewChapter}
        onClose={() => setPreviewChapter(null)}
        chapter={previewChapter}
      />
    </>
  );
}
