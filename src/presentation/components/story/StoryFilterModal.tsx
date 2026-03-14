import { useState, useEffect } from "react";
import { Modal } from "@/presentation/components/ui/Modal";
import { Button } from "@/presentation/components/ui/Button";
import { useCategories } from "@/presentation/hooks/category/useCategories";
import type { StoryFilter } from "@/core/domain/story";
import { cn } from "@/lib/cn";

interface StoryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: StoryFilter;
  onApply: (filter: Pick<StoryFilter, "category_id" | "status">) => void;
}

const statusOptions = [
  { value: "", label: "Semua Status" },
  { value: "publish", label: "Publish" },
  { value: "draft", label: "Draft" },
] as const;

type StatusValue = "" | "publish" | "draft";

export function StoryFilterModal({
  isOpen,
  onClose,
  filter,
  onApply,
}: StoryFilterModalProps) {
  const { data: categoryRes, isLoading } = useCategories();
  const categories = categoryRes?.data ?? [];

  const [selectedCategory, setSelectedCategory] = useState(
    filter.category_id ?? "",
  );
  const [selectedStatus, setSelectedStatus] = useState(filter.status ?? "");

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(filter.category_id ?? "");
      setSelectedStatus(filter.status ?? "");
    }
  }, [isOpen, filter]);

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedStatus("");
  };

  const handleApply = () => {
    onApply({
      category_id: selectedCategory || undefined,
      status: (selectedStatus as StoryFilter["status"]) || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Story" size="sm">
      <div className="space-y-5">
        {/* Category */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>
          {isLoading ? (
            <p className="text-sm text-gray-400">Memuat...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  selectedCategory === ""
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50",
                )}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    selectedCategory === cat.id
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50",
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Status</p>
          <div className="flex flex-col gap-2">
            {statusOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={selectedStatus === opt.value}
                  onChange={(e) => setSelectedStatus(e.target.value as StatusValue)}
                  className="accent-primary"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={handleReset}>
          Reset Filter
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleApply}>Terapkan</Button>
        </div>
      </div>
    </Modal>
  );
}
