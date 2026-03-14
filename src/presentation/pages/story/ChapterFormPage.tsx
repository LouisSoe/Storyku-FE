// src/presentation/pages/story/ChapterFormPage.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/presentation/components/ui/Input";
import { Button } from "@/presentation/components/ui/Button";
import { Skeleton } from "@/presentation/components/ui/Skeleton";
import { RichTextEditor } from "@/presentation/components/chapter/RichTextEditor";
import { useChapterMutation } from "@/presentation/hooks/chapter/useChapterMutation";
import { useStory } from "@/presentation/hooks/story/useStory";
import { useConfirm } from "@/presentation/hooks/useConfirm";
import { useDraftStoryStore } from "@/store/draftStoryStore";
import { chapterSchema, type ChapterFormValues } from "./schema";

interface ChapterFormPageProps {
  mode: "add" | "edit";
}

export function ChapterFormPage({ mode }: ChapterFormPageProps) {
  const { id: storyId, chapterId } = useParams<{
    id: string;
    chapterId: string;
  }>();
  const navigate = useNavigate();
  const { confirm } = useConfirm();

  const isDraft = !storyId || storyId === "new";
  const isEdit = mode === "edit";

  // ─── Draft store (hanya mode draft) ───────────────────────────────────────
  const {
    chapters: draftChapters,
    addChapter,
    updateChapter: updateDraftChapter,
  } = useDraftStoryStore();

  // ─── Fetch story untuk ambil data chapter (hanya mode saved + edit) ───────
  // Tidak ada endpoint GET /chapters/:id, jadi ambil dari story detail
  const { data: storyRes, isLoading: isLoadingStory } = useStory(
    !isDraft && isEdit ? storyId! : "",
  );
  const savedChapter = storyRes?.data?.chapters?.find(
    (c) => c.id === chapterId,
  );

  // ─── API mutation (hanya mode saved) ──────────────────────────────────────
  const { create: createChapterApi, update: updateChapterApi } =
    useChapterMutation(isDraft ? "" : (storyId ?? ""));

  // ─── Draft chapter (hanya mode draft + edit) ──────────────────────────────
  const draftChapter =
    isDraft && isEdit && chapterId
      ? draftChapters.find((c) => c.localId === chapterId)
      : undefined;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: { title: "", content: "" },
  });

  // ─── Prefill draft chapter ─────────────────────────────────────────────────
  useEffect(() => {
    if (isDraft && isEdit && draftChapter) {
      reset({
        title: draftChapter.title,
        content: draftChapter.content,
      });
    }
  }, [isDraft, isEdit, draftChapter, reset]);

  // ─── Prefill saved chapter dari API ───────────────────────────────────────
  useEffect(() => {
    if (!isDraft && isEdit && savedChapter) {
      reset({
        title: savedChapter.title,
        content: savedChapter.content,
      });
    }
  }, [isDraft, isEdit, savedChapter, reset]);

  const goBack = () => {
    if (isDraft) {
      navigate("/stories/new");
    } else {
      navigate(`/stories/${storyId}/edit`);
    }
  };

  const onSubmit = async (values: ChapterFormValues) => {
    if (isDraft) {
      if (isEdit && chapterId) {
        updateDraftChapter(chapterId, {
          title: values.title,
          content: values.content,
        });
        toast.success("Chapter diperbarui");
      } else {
        addChapter({ title: values.title, content: values.content });
        toast.success("Chapter ditambahkan");
      }
      goBack();
      return;
    }

    // Mode saved — hit API
    if (isEdit && chapterId) {
      await toast.promise(
        updateChapterApi.mutateAsync({ chapterId, payload: values }),
        {
          loading: "Menyimpan chapter...",
          success: "Chapter berhasil diperbarui",
          error: "Gagal memperbarui chapter",
        },
      );
    } else {
      await toast.promise(createChapterApi.mutateAsync(values), {
        loading: "Menyimpan chapter...",
        success: "Chapter berhasil ditambahkan",
        error: "Gagal menambahkan chapter",
      });
    }
    goBack();
  };

  const handleCancel = async () => {
    const confirmed = await confirm(
      "Yakin ingin membatalkan?",
      "Konten yang sudah ditulis tidak akan disimpan.",
    );
    if (confirmed) goBack();
  };

  // ─── Loading state (fetch saved chapter) ──────────────────────────────────
  if (!isDraft && isEdit && isLoadingStory) {
    return (
      <div className="max-w-4xl space-y-6">
        <Skeleton className="h-9 w-40" />
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <Skeleton className="h-10 w-full mb-4" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft size={16} />}
        onClick={handleCancel}
      >
        Kembali ke Story
      </Button>

      <div className="space-y-5">
        {/* Title */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <Input
            label="Judul Chapter"
            placeholder="contoh: Bab 1: Pengenalan"
            error={errors.title?.message}
            required
            {...register("title")}
          />
        </div>

        {/* Rich Text Editor */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.content?.message}
                placeholder="Mulai menulis konten chapter di sini..."
              />
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCancel}>
            Batal
          </Button>
          <Button loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Simpan Perubahan" : "Simpan Chapter"}
          </Button>
        </div>
      </div>
    </div>
  );
}
