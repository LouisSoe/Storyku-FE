import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/presentation/components/ui/Button";
import { Pagination } from "@/presentation/components/ui/Pagination";
import { StoryTable } from "@/presentation/components/story/StoryTable";
import { StoryFilterModal } from "@/presentation/components/story/StoryFilterModal";
import { useStories } from "@/presentation/hooks/story/useStories";
import { useStoryMutation } from "@/presentation/hooks/story/useStoryMutation";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import { useConfirm } from "@/presentation/hooks/useConfirm";
import type { StoryDetail, StoryFilter } from "@/core/domain/story";
import { cn } from "@/lib/cn";

export function StoryListPage() {
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { remove } = useStoryMutation();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    Pick<StoryFilter, "category_id" | "status">
  >({});

  const debouncedSearch = useDebounce(search, 400);

  const filter: StoryFilter = {
    search: debouncedSearch || undefined,
    category_id: activeFilter.category_id,
    status: activeFilter.status,
    page,
    limit: 10,
  };

  const { data, isLoading } = useStories(filter);
  const stories = data?.data ?? [];
  const meta = data?.meta;

  const isFiltered = !!(activeFilter.category_id || activeFilter.status);

  const handleApplyFilter = (
    f: Pick<StoryFilter, "category_id" | "status">,
  ) => {
    setActiveFilter(f);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (story: StoryDetail) => {
    const confirmed = await confirm(
      `Hapus story "${story.title}"?`,
      "Semua chapter di dalam story ini juga akan dihapus.",
    );
    if (!confirmed) return;

    toast.promise(remove.mutateAsync(story.id), {
      loading: "Menghapus story...",
      success: "Story berhasil dihapus",
      error: "Gagal menghapus story",
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Story List</h2>
          {meta && (
            <p className="text-sm text-gray-500 mt-0.5">
              {meta.total} story ditemukan
            </p>
          )}
        </div>
        <Button
          leftIcon={<Plus size={16} />}
          onClick={() => navigate("/stories/new")}
        >
          Tambah Story
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Cari judul atau penulis..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none
              focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>

        <Button
          variant="secondary"
          leftIcon={<SlidersHorizontal size={15} />}
          onClick={() => setIsFilterOpen(true)}
          className={cn(isFiltered && "border-primary text-primary")}
        >
          Filter
          {isFiltered && (
            <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              ✓
            </span>
          )}
        </Button>
      </div>

      {/* Table */}
      <StoryTable data={stories} loading={isLoading} onDelete={handleDelete} />

      {/* Pagination */}
      {meta && (
        <Pagination
          page={page}
          totalPages={meta.total_pages}
          total={meta.total}
          limit={meta.limit}
          onPageChange={setPage}
        />
      )}

      {/* Filter Modal */}
      <StoryFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filter={activeFilter}
        onApply={handleApplyFilter}
      />
    </div>
  );
}
