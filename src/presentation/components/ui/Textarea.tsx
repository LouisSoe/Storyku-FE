import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          "rounded-lg border border-gray-300 px-3 py-2 text-sm",
          "placeholder:text-gray-400 outline-none transition resize-y min-h-[80px]",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-red-400 focus:border-red-400 focus:ring-red-200",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  ),
);
Textarea.displayName = "Textarea";
