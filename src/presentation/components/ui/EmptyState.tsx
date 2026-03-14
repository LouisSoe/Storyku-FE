import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  message = "Belum ada data",
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <BookOpen size={24} className="text-gray-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{message}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
