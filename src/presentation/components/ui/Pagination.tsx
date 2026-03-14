import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm text-gray-500">
        Menampilkan{" "}
        <span className="font-medium text-gray-700">
          {from}–{to}
        </span>{" "}
        dari <span className="font-medium text-gray-700">{total}</span> data
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            "rounded-lg p-1.5 transition",
            page <= 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-100",
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "w-8 h-8 rounded-lg text-sm font-medium transition",
                p === page
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            "rounded-lg p-1.5 transition",
            page >= totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-100",
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
