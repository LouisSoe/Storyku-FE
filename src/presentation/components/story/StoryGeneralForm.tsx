// src/presentation/components/story/StoryGeneralForm.tsx
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Input } from "@/presentation/components/ui/Input";
import { Textarea } from "@/presentation/components/ui/Textarea";
import { Select } from "@/presentation/components/ui/Select";
import { ImageUpload } from "@/presentation/components/ui/ImageUpload";
import { TagMultiSelect } from "./TagMultiSelect";
import { useCategories } from "@/presentation/hooks/category/useCategories";
import type { StoryFormValues } from "@/presentation/pages/story/schema";

interface StoryGeneralFormProps {
  control: Control<StoryFormValues>;
  errors: FieldErrors<StoryFormValues>;
  coverPreviewUrl?: string;
  onCoverChange?: (file: File | null, previewUrl: string) => void;
  disabled?: boolean;
}

export function StoryGeneralForm({
  control,
  errors,
  coverPreviewUrl, 
  onCoverChange, 
  disabled,
}: StoryGeneralFormProps) {
  const { data: categoryRes } = useCategories();
  const categoryOptions = (categoryRes?.data ?? []).map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Title */}
      <div className="lg:col-span-2">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="Judul Story"
              placeholder="Masukkan judul story..."
              error={errors.title?.message}
              disabled={disabled}
              required
              {...field}
            />
          )}
        />
      </div>

      {/* Author */}
      <Controller
        name="author"
        control={control}
        render={({ field }) => (
          <Input
            label="Penulis"
            placeholder="Nama penulis..."
            error={errors.author?.message}
            disabled={disabled}
            required
            {...field}
          />
        )}
      />

      {/* Category */}
      <Controller
        name="category_id"
        control={control}
        render={({ field }) => (
          <Select
            label="Category"
            placeholder="— Pilih category —"
            options={categoryOptions}
            disabled={disabled}
            error={errors.category_id?.message}
            {...field}
          />
        )}
      />

      {/* Synopsis */}
      <div className="lg:col-span-2">
        <Controller
          name="synopsis"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Sinopsis"
              placeholder="Tuliskan sinopsis singkat..."
              rows={4}
              disabled={disabled}
              error={errors.synopsis?.message}
              {...field}
            />
          )}
        />
      </div>

      {/* Tags */}
      <div className="lg:col-span-2">
        <Controller
          name="tag_ids"
          control={control}
          render={({ field }) => (
            <TagMultiSelect
              value={field.value ?? []}
              onChange={field.onChange}
              disabled={disabled}
            />
          )}
        />
      </div>

      {/* Cover */}
      <div>
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={coverPreviewUrl}
              onChange={(file) => {
                field.onChange(file);
                if (onCoverChange) {
                  const previewUrl = file ? URL.createObjectURL(file) : "";
                  onCoverChange(file, previewUrl);
                }
              }}
              disabled={disabled}
              error={errors.cover?.message as string | undefined}
            />
          )}
        />
      </div>

      {/* Status */}
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            label="Status"
            options={[
              { value: "draft", label: "Draft" },
              { value: "publish", label: "Publish" },
            ]}
            disabled={disabled}
            error={errors.status?.message}
            {...field}
          />
        )}
      />
    </div>
  );
}
