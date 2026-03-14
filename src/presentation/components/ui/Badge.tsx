import { cn } from "@/lib/cn";
import { X } from "lucide-react";

type BadgeVariant =
  | "default"
  | "publish"
  | "draft"
  | "financial"
  | "technology"
  | "health"
  | "tag";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  publish: "bg-emerald-100 text-emerald-700",
  draft: "bg-gray-100 text-gray-500",
  financial: "bg-blue-100 text-blue-700",
  technology: "bg-purple-100 text-purple-700",
  health: "bg-green-100 text-green-700",
  tag: "bg-indigo-50 text-indigo-600",
};

export function Badge({
  label,
  variant = "default",
  onRemove,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full hover:bg-black/10 p-0.5 transition"
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

// Helper: tentukan variant badge berdasarkan slug category
export function getCategoryBadgeVariant(slug: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    financial: "financial",
    technology: "technology",
    health: "health",
  };
  return map[slug] ?? "default";
}
