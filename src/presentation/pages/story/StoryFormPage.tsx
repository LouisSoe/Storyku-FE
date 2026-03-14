// src/presentation/pages/story/StoryFormPage.tsx
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/presentation/components/ui/Button'
import { Skeleton } from '@/presentation/components/ui/Skeleton'
import { StoryGeneralForm } from '@/presentation/components/story/StoryGeneralForm'
import { ChapterTable } from '@/presentation/components/story/ChapterTable'
import { useStory } from '@/presentation/hooks/story/useStory'
import { useStoryMutation } from '@/presentation/hooks/story/useStoryMutation'
import { useChapterMutation } from '@/presentation/hooks/chapter/useChapterMutation'
import { useConfirm } from '@/presentation/hooks/useConfirm'
import { useDraftStoryStore, type DraftChapter } from '@/store/draftStoryStore'
import { storySchema, type StoryFormValues } from './schema'
import type { Chapter } from '@/core/domain/chapter'

interface StoryFormPageProps {
  mode: 'add' | 'edit'
}

export function StoryFormPage({ mode }: StoryFormPageProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { confirm } = useConfirm()
  const isEdit = mode === 'edit'

  const {
    chapters: draftChapters,
    removeChapter: removeDraftChapter,
    clearDraft,
    formValues: draftFormValues,
    setFormValues,
    coverFile,
    coverPreviewUrl,
    setCover,
  } = useDraftStoryStore()

  const { data: storyRes, isLoading } = useStory(isEdit ? id! : '')
  const story = storyRes?.data

  const { create: createStory, update: updateStory } = useStoryMutation()
  const { remove: removeChapter } = useChapterMutation(id ?? '')

  const {
    control,
    handleSubmit,
    reset,
    getValues,   
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '', author: '', synopsis: '',
      category_id: '', tag_ids: [], status: 'draft', cover: null,
    },
  })

  useEffect(() => {
    if (isEdit) return
    reset({
      title:       draftFormValues.title       ?? '',
      author:      draftFormValues.author      ?? '',
      synopsis:    draftFormValues.synopsis    ?? '',
      category_id: draftFormValues.category_id ?? '',
      tag_ids:     draftFormValues.tag_ids     ?? [],
      status:      draftFormValues.status      ?? 'draft',
      cover:       null,
    })
    // Restore cover File ke RHF
    if (coverFile) {
      setValue('cover', coverFile)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]) // ← hanya saat mount, jangan tambah dependency lain

  // Prefill form dari API (mode edit)
  useEffect(() => {
    if (isEdit && story) {
      reset({
        title:       story.title,
        author:      story.author,
        synopsis:    story.synopsis ?? '',
        category_id: story.category_id ?? '',
        tag_ids:     story.tags.map((t) => t.id),
        status:      story.status,
        cover:       null,
      })
    }
  }, [isEdit, story, reset])

  const syncAndNavigateToChapter = (path: string) => {
    const current = getValues()
    setFormValues({
      title:       current.title,
      author:      current.author,
      synopsis:    current.synopsis,
      category_id: current.category_id,
      tag_ids:     current.tag_ids,
      status:      current.status,
    })
    navigate(path)
  }

  const onSubmit = async (values: StoryFormValues) => {
    const payload = {
      title:       values.title,
      author:      values.author,
      synopsis:    values.synopsis,
      category_id: values.category_id || undefined,
      tag_ids:     values.tag_ids,
      status:      values.status,
      cover:       values.cover ?? undefined,
    }

    if (isEdit) {
      await toast.promise(
        updateStory.mutateAsync({ id: id!, payload }),
        {
          loading: 'Menyimpan perubahan...',
          success: 'Story berhasil diperbarui!',
          error:   'Gagal memperbarui story',
        }
      )
    } else {
      await toast.promise(
        createStory.mutateAsync(payload),
        {
          loading: 'Menyimpan story...',
          success: 'Story berhasil disimpan!',
          error:   'Gagal menyimpan story',
        }
      )
    }

    clearDraft()
    navigate('/stories')
  }

  const handleCancel = async () => {
    const confirmed = await confirm(
      'Yakin ingin membatalkan?',
      'Semua perubahan yang belum disimpan akan hilang.'
    )
    if (confirmed) {
      clearDraft()
      navigate('/stories')
    }
  }

  const handleDeleteSavedChapter = async (chapter: Chapter) => {
    const confirmed = await confirm(
      `Hapus chapter "${chapter.title}"?`,
      'Chapter ini akan dihapus secara permanen.'
    )
    if (!confirmed) return
    toast.promise(removeChapter.mutateAsync(chapter.id), {
      loading: 'Menghapus chapter...',
      success: 'Chapter berhasil dihapus',
      error:   'Gagal menghapus chapter',
    })
  }

  if (isEdit && isLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-9 w-64" />
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Section A: General Information */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900">
            A. Informasi Umum
          </h3>
        </div>
        <div className="p-6">
          <StoryGeneralForm
            control={control}
            errors={errors}
            coverPreviewUrl={
              isEdit
                ? story?.cover_url
                  ? `${import.meta.env.VITE_BASE_URL}${story.cover_url}`
                  : undefined
                : coverPreviewUrl || undefined
            }
            onCoverChange={!isEdit ? setCover : undefined}
          />
        </div>
      </div>

      {/* Section B: Chapter List */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900">
            B. Daftar Chapter
          </h3>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Plus size={14} />}
            onClick={() => {
              if (isEdit && id) {
                navigate(`/stories/${id}/chapters/new`);
              } else {
                syncAndNavigateToChapter("/stories/new/chapters/new");
              }
            }}
          >
            New Chapter
          </Button>
        </div>
        <div className="p-6">
          {isEdit ? (
            <ChapterTable
              mode="saved"
              data={story?.chapters ?? []}
              storyId={id!}
              onDeleteSaved={handleDeleteSavedChapter}
            />
          ) : (
            <ChapterTable
              mode="draft"
              data={draftChapters}
              onEditDraft={(chapter: DraftChapter) => {
                syncAndNavigateToChapter(
                  `/stories/new/chapters/${chapter.localId}/edit`,
                );
              }}
              onDeleteDraft={(localId) => {
                removeDraftChapter(localId);
                toast.success("Chapter dihapus");
              }}
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Batal
        </Button>
        <Button loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {isEdit ? "Simpan Perubahan" : "Simpan Story"}
        </Button>
      </div>
    </div>
  );
}