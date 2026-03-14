import { useRef, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface ImageUploadProps {
  value?: string; // URL preview (untuk mode edit)
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

export function ImageUpload({
  value,
  onChange,
  error,
  disabled,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Format tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`Ukuran file melebihi ${MAX_SIZE_MB}MB.`);
      return;
    }
    setFileError(null);
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = fileError ?? error;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Story Cover</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed",
          "h-40 cursor-pointer transition",
          disabled
            ? "cursor-not-allowed bg-gray-50 border-gray-200"
            : "border-gray-300 hover:border-primary hover:bg-primary-50",
          displayError && "border-red-400",
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="h-full w-full rounded-xl object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow hover:bg-white transition"
              >
                <X size={14} />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImageIcon size={28} />
            <p className="text-xs">Drag & drop atau klik untuk upload</p>
            <p className="text-xs">JPG, PNG, WebP — Maks. 5MB</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {displayError && <p className="text-xs text-red-500">{displayError}</p>}
    </div>
  );
}
