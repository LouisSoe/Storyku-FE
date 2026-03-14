// src/presentation/components/chapter/ChapterPreviewModal.tsx
import { Modal } from "@/presentation/components/ui/Modal";
import { formatDate } from "@/lib/formatDate";
import type { Chapter } from "@/core/domain/chapter";

interface ChapterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter | null;
}

export function ChapterPreviewModal({
  isOpen,
  onClose,
  chapter,
}: ChapterPreviewModalProps) {
  if (!chapter) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={chapter.title} size="xl">
      <div className="space-y-3">
        <p className="text-xs text-gray-400">
          Terakhir diperbarui: {formatDate(chapter.updated_at)}
        </p>
        <hr className="border-gray-100" />
        <div
          className="prose prose-sm max-w-none text-gray-800
            prose-headings:font-semibold prose-headings:text-gray-900
            prose-p:leading-relaxed prose-p:text-gray-700
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-gray-700"
          dangerouslySetInnerHTML={{
            __html:
              chapter.content ||
              '<p class="text-gray-400 italic">Belum ada konten.</p>',
          }}
        />
      </div>
    </Modal>
  );
}
