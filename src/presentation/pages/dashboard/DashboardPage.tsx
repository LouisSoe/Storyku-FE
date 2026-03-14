import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Eye,
  PenLine,
  Layers,
  Tag,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useDashboard } from "@/presentation/hooks/dashboard/useDashboard";
import {
  Badge,
  getCategoryBadgeVariant,
} from "@/presentation/components/ui/Badge";
import { Skeleton } from "@/presentation/components/ui/Skeleton";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/cn";
import type {
  DashboardSummary,
  StoriesPerCategory,
  TopTag,
  RecentStory,
  RecentChapter,
} from "@/core/domain/dashboard";

export function DashboardPage() {
  const { data: res, isLoading } = useDashboard();
  const navigate = useNavigate();
  const data = res?.data;

  if (isLoading) return <DashboardSkeleton />;

  if (!data)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Gagal memuat data dashboard.</p>
      </div>
    );

  const publishTotal =
    data.stories_per_status.find((s) => s.status === "publish")?.total ?? 0;
  const draftTotal =
    data.stories_per_status.find((s) => s.status === "draft")?.total ?? 0;
  const grandTotal = publishTotal + draftTotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Ringkasan aktivitas platform Storyku
        </p>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryCard
          label="Total Story"
          value={data.summary.total_stories}
          icon={<BookOpen size={18} />}
          color="indigo"
          onClick={() => navigate("/stories")}
        />
        <SummaryCard
          label="Publish"
          value={data.summary.total_published}
          icon={<Eye size={18} />}
          color="emerald"
          onClick={() => navigate("/stories?status=publish")}
        />
        <SummaryCard
          label="Draft"
          value={data.summary.total_draft}
          icon={<PenLine size={18} />}
          color="amber"
          onClick={() => navigate("/stories?status=draft")}
        />
        <SummaryCard
          label="Chapter"
          value={data.summary.total_chapters}
          icon={<FileText size={18} />}
          color="blue"
        />
        <SummaryCard
          label="Category"
          value={data.summary.total_categories}
          icon={<Layers size={18} />}
          color="purple"
          onClick={() => navigate("/categories")}
        />
        <SummaryCard
          label="Tag"
          value={data.summary.total_tags}
          icon={<Tag size={18} />}
          color="pink"
          onClick={() => navigate("/tags")}
        />
      </div>

      {/* ── Row 2: Status + Category ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Status Distribution */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5">
          <SectionTitle icon={<TrendingUp size={15} />} title="Status Story" />
          <div className="mt-4 space-y-3">
            <StatusBar
              label="Publish"
              value={publishTotal}
              total={grandTotal}
              color="bg-emerald-500"
            />
            <StatusBar
              label="Draft"
              value={draftTotal}
              total={grandTotal}
              color="bg-amber-400"
            />
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <span>{grandTotal} story total</span>
            <span>
              {grandTotal > 0
                ? `${Math.round((publishTotal / grandTotal) * 100)}% published`
                : "—"}
            </span>
          </div>
        </div>

        {/* Stories per Category */}
        <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-white p-5">
          <SectionTitle
            icon={<Layers size={15} />}
            title="Story per Category"
          />
          <div className="mt-4 space-y-3">
            {data.stories_per_category.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Belum ada data
              </p>
            ) : (
              data.stories_per_category.map((cat) => (
                <CategoryBar
                  key={cat.category_id}
                  item={cat}
                  max={Math.max(
                    ...data.stories_per_category.map((c) => c.total),
                    1,
                  )}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Row 3: Top Tags + Recent Stories ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Top Tags */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5">
          <SectionTitle icon={<Tag size={15} />} title="Top 5 Tags" />
          <div className="mt-4 space-y-2.5">
            {data.top_tags.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Belum ada tag dipakai
              </p>
            ) : (
              data.top_tags.map((tag, i) => (
                <TopTagRow key={tag.tag_id} tag={tag} rank={i + 1} />
              ))
            )}
          </div>
        </div>

        {/* Recent Stories */}
        <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={<BookOpen size={15} />} title="Story Terbaru" />
            <button
              onClick={() => navigate("/stories")}
              className="text-xs text-primary hover:underline font-medium"
            >
              Lihat semua →
            </button>
          </div>
          <div className="space-y-3">
            {data.recent_stories.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Belum ada story
              </p>
            ) : (
              data.recent_stories.map((story) => (
                <RecentStoryRow
                  key={story.id}
                  story={story}
                  onClick={() => navigate(`/stories/${story.id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Row 4: Recent Chapters ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <SectionTitle
            icon={<Clock size={15} />}
            title="Chapter Terbaru Diperbarui"
          />
        </div>
        <div className="divide-y divide-gray-50">
          {data.recent_chapters.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              Belum ada chapter
            </p>
          ) : (
            data.recent_chapters.map((chapter) => (
              <RecentChapterRow
                key={chapter.id}
                chapter={chapter}
                onClick={() => navigate(`/stories/${chapter.story_id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    icon: "text-indigo-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "text-emerald-500",
  },
  amber: { bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-500" },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    icon: "text-purple-500",
  },
  pink: { bg: "bg-pink-50", text: "text-pink-700", icon: "text-pink-500" },
};

function SummaryCard({
  label,
  value,
  icon,
  color,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: keyof typeof colorMap;
  onClick?: () => void;
}) {
  const c = colorMap[color];
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-4 space-y-3",
        onClick &&
          "cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all",
      )}
    >
      <div className={cn("inline-flex rounded-lg p-2", c.bg)}>
        <span className={c.icon}>{icon}</span>
      </div>
      <div>
        <p className={cn("text-2xl font-bold", c.text)}>
          {value.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">{icon}</span>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    </div>
  );
}

function StatusBar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700 font-medium">{label}</span>
        <span className="text-sm font-bold text-gray-900">
          {value}{" "}
          <span className="text-xs text-gray-400 font-normal">({pct}%)</span>
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            color,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CategoryBar({ item, max }: { item: StoriesPerCategory; max: number }) {
  const pct = max > 0 ? Math.round((item.total / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 shrink-0">
        <Badge
          label={item.category_name}
          variant={getCategoryBadgeVariant(item.category_slug)}
        />
      </div>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gray-700 w-6 text-right shrink-0">
        {item.total}
      </span>
    </div>
  );
}

function TopTagRow({ tag, rank }: { tag: TopTag; rank: number }) {
  const rankColors = ["text-amber-500", "text-gray-400", "text-orange-400"];
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "text-xs font-bold w-4 text-center",
          rankColors[rank - 1] ?? "text-gray-300",
        )}
      >
        {rank}
      </span>
      <span className="flex-1 text-sm text-gray-700 font-medium truncate">
        #{tag.tag_name}
      </span>
      <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
        {tag.total}
      </span>
    </div>
  );
}

function RecentStoryRow({
  story,
  onClick,
}: {
  story: RecentStory;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
    >
      {/* Cover */}
      {story.cover_url ? (
        <img
          src={`${import.meta.env.VITE_BASE_URL}${story.cover_url}`}
          alt={story.title}
          className="h-10 w-8 rounded-md object-cover shrink-0 border border-gray-100"
        />
      ) : (
        <div className="h-10 w-8 rounded-md bg-gray-100 shrink-0 flex items-center justify-center">
          <BookOpen size={12} className="text-gray-300" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
          {story.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {story.author}
          {story.category_name && <span className="mx-1">·</span>}
          {story.category_name}
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge
          label={story.status === "publish" ? "Publish" : "Draft"}
          variant={story.status === "publish" ? "publish" : "draft"}
        />
        <span className="text-xs text-gray-400">
          {formatDate(story.created_at)}
        </span>
      </div>
    </div>
  );
}

function RecentChapterRow({
  chapter,
  onClick,
}: {
  chapter: RecentChapter;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors group"
    >
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <FileText size={14} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
          {chapter.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          dari: <span className="text-gray-600">{chapter.story_title}</span>
        </p>
      </div>
      <span className="text-xs text-gray-400 shrink-0">
        {formatDate(chapter.updated_at)}
      </span>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-56 mt-2" />
      </div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
          >
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Skeleton className="lg:col-span-2 h-44 rounded-xl" />
        <Skeleton className="lg:col-span-3 h-44 rounded-xl" />
      </div>
      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Skeleton className="lg:col-span-2 h-56 rounded-xl" />
        <Skeleton className="lg:col-span-3 h-56 rounded-xl" />
      </div>
      {/* Row 4 */}
      <Skeleton className="h-48 rounded-xl" />
    </div>
  );
}
