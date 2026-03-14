import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Badge } from "@/presentation/components/ui/Badge";
import { useTags } from "@/presentation/hooks/tag/useTags";
import { cn } from "@/lib/cn";
import type { Tag } from "@/core/domain/tag";

interface TagMultiSelectProps {
  value: string[]; // array of tag IDs
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  error?: string;
}

export function TagMultiSelect({
  value,
  onChange,
  disabled,
  error,
}: TagMultiSelectProps) {
  const { data: tagRes } = useTags();
  const allTags: Tag[] = tagRes?.data ?? [];

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedTags = allTags.filter((t) => value.includes(t.id));
  const filteredTags = allTags.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Tags</label>

      {/* Selected badges */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              label={tag.name}
              variant="tag"
              onRemove={disabled ? undefined : () => toggle(tag.id)}
            />
          ))}
        </div>
      )}

      {/* Dropdown trigger */}
      {!disabled && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className={cn(
              "w-full flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
              "bg-white text-gray-600 transition",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              error
                ? "border-red-400"
                : "border-gray-300 hover:border-gray-400",
            )}
          >
            <span className="text-gray-400">
              {selectedTags.length === 0
                ? "Pilih tag..."
                : `${selectedTags.length} tag dipilih`}
            </span>
            <ChevronDown
              size={16}
              className={cn("transition-transform", isOpen && "rotate-180")}
            />
          </button>

          {/* Dropdown panel */}
          {isOpen && (
            <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg">
              {/* Search */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari tag..."
                  className="w-full text-sm outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Options */}
              <ul className="max-h-48 overflow-y-auto py-1">
                {filteredTags.length === 0 ? (
                  <li className="px-3 py-2 text-xs text-gray-400 text-center">
                    Tidak ada tag ditemukan
                  </li>
                ) : (
                  filteredTags.map((tag) => {
                    const selected = value.includes(tag.id);
                    return (
                      <li
                        key={tag.id}
                        onClick={() => toggle(tag.id)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition",
                          selected
                            ? "bg-primary/5 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        <span
                          className={cn(
                            "h-4 w-4 rounded border flex items-center justify-center shrink-0 transition",
                            selected
                              ? "bg-primary border-primary"
                              : "border-gray-300",
                          )}
                        >
                          {selected && (
                            <svg
                              viewBox="0 0 10 8"
                              className="w-2.5 fill-white"
                            >
                              <path
                                d="M1 4l3 3L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        {tag.name}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsOpen(false);
            setSearch("");
          }}
        />
      )}
    </div>
  );
}
