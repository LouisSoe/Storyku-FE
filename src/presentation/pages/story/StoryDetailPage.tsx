import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/presentation/components/ui/Button";
import {
  Badge,
  getCategoryBadgeVariant,
} from "@/presentation/components/ui/Badge";
import { Skeleton } from "@/presentation/components/ui/Skeleton";
import { ChapterTable } from "@/presentation/components/story/ChapterTable";
import { useStory } from "@/presentation/hooks/story/useStory";

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useStory(id!);

  const story = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Story tidak ditemukan.</p>
        <Button className="mt-4" onClick={() => navigate("/stories")}>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Topbar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate("/stories")}
        >
          Kembali
        </Button>
        <Button
          leftIcon={<Pencil size={15} />}
          onClick={() => navigate(`/stories/${id}/edit`)}
        >
          Edit Story
        </Button>
      </div>

      {/* General Info */}
      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <div className="px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900">
            Informasi Umum
          </h3>
        </div>

        {/* Cover */}
        {story.cover_url && (
          <div className="px-6 py-4">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Cover
            </p>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${story.cover_url}`}
              alt={story.title}
              className="h-40 w-32 rounded-xl object-cover border border-gray-200"
            />
          </div>
        )}

        <DetailRow label="Judul" value={story.title} />
        <DetailRow label="Penulis" value={story.author} />
        <DetailRow label="Sinopsis" value={story.synopsis || "—"} multiline />
        <DetailRow
          label="Category"
          value={
            story.category ? (
              <Badge
                label={story.category.name}
                variant={getCategoryBadgeVariant(story.category.slug)}
              />
            ) : (
              <span className="text-gray-400">—</span>
            )
          }
        />
        <DetailRow
          label="Tags"
          value={
            story.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {story.tags.map((tag) => (
                  <Badge key={tag.id} label={tag.name} variant="tag" />
                ))}
              </div>
            ) : (
              <span className="text-gray-400">—</span>
            )
          }
        />
        <DetailRow
          label="Status"
          value={
            <Badge
              label={story.status === "publish" ? "Publish" : "Draft"}
              variant={story.status === "publish" ? "publish" : "draft"}
            />
          }
        />
      </div>

      {/* Chapters */}
      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <div className="px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900">
            Daftar Chapter ({story.chapters?.length ?? 0})
          </h3>
        </div>
        <div className="p-6">
          <ChapterTable
            mode="saved"
            data={story.chapters ?? []}
            storyId={story.id}
            onDeleteSaved={() => {}}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div
      className={`px-6 py-4 flex gap-4 ${multiline ? "flex-col" : "items-start"}`}
    >
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-32 shrink-0 pt-0.5">
        {label}
      </p>
      <div className="text-sm text-gray-800 flex-1">
        {typeof value === "string" ? (
          <p className={multiline ? "whitespace-pre-wrap" : ""}>{value}</p>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
