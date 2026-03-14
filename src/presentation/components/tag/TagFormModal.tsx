import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/presentation/components/ui/Modal";
import { Input } from "@/presentation/components/ui/Input";
import { Button } from "@/presentation/components/ui/Button";
import { slugify } from "@/lib/slugify";
import type { Tag } from "@/core/domain/tag";

const schema = z.object({
  name: z.string().min(1, "Nama tag wajib diisi").max(100),
});

type FormValues = z.infer<typeof schema>;

interface TagFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isLoading?: boolean;
  editData?: Tag | null;
}

export function TagFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  editData,
}: TagFormModalProps) {
  const isEdit = !!editData;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (isOpen) {
      reset({ name: editData?.name ?? "" });
    }
  }, [isOpen, editData, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Tag" : "Tambah Tag"}
      size="sm"
    >
      <form
        onSubmit={handleSubmit((v) => onSubmit(v.name))}
        className="space-y-4"
      >
        <Input
          label="Nama Tag"
          placeholder="contoh: golang"
          error={errors.name?.message}
          required
          {...register("name")}
        />

        {nameValue && (
          <p className="text-xs text-gray-400">
            Slug:{" "}
            <span className="text-gray-600 font-medium">
              {slugify(nameValue)}
            </span>
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" loading={isLoading}>
            {isEdit ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
