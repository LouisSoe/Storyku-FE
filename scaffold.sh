#!/bin/bash

# Daftar file yang akan dibuat
files=(
  "src/core/domain/common.ts"
  "src/core/domain/story.ts"
  "src/core/domain/chapter.ts"
  "src/core/domain/category.ts"
  "src/core/domain/tag.ts"
  "src/core/repository/IStoryRepository.ts"
  "src/core/repository/IChapterRepository.ts"
  "src/core/repository/ICategoryRepository.ts"
  "src/core/repository/ITagRepository.ts"
  "src/infrastructure/api/http.client.ts"
  "src/infrastructure/api/story.repository.ts"
  "src/infrastructure/api/chapter.repository.ts"
  "src/infrastructure/api/category.repository.ts"
  "src/infrastructure/api/tag.repository.ts"
  "src/presentation/pages/story/StoryListPage.tsx"
  "src/presentation/pages/story/StoryDetailPage.tsx"
  "src/presentation/pages/story/StoryFormPage.tsx"
  "src/presentation/pages/story/ChapterFormPage.tsx"
  "src/presentation/pages/category/CategoryPage.tsx"
  "src/presentation/pages/tag/TagPage.tsx"
  "src/presentation/pages/NotFoundPage.tsx"
  "src/presentation/components/ui/Button.tsx"
  "src/presentation/components/ui/Input.tsx"
  "src/presentation/components/ui/Textarea.tsx"
  "src/presentation/components/ui/Select.tsx"
  "src/presentation/components/ui/Badge.tsx"
  "src/presentation/components/ui/Modal.tsx"
  "src/presentation/components/ui/ConfirmModal.tsx"
  "src/presentation/components/ui/Table.tsx"
  "src/presentation/components/ui/Pagination.tsx"
  "src/presentation/components/ui/Spinner.tsx"
  "src/presentation/components/ui/Skeleton.tsx"
  "src/presentation/components/ui/EmptyState.tsx"
  "src/presentation/components/ui/ImageUpload.tsx"
  "src/presentation/components/story/StoryTable.tsx"
  "src/presentation/components/story/StoryFilterModal.tsx"
  "src/presentation/components/story/StoryGeneralForm.tsx"
  "src/presentation/components/story/TagMultiSelect.tsx"
  "src/presentation/components/story/ChapterTable.tsx"
  "src/presentation/components/chapter/RichTextEditor.tsx"
  "src/presentation/components/category/CategoryTable.tsx"
  "src/presentation/components/category/CategoryFormModal.tsx"
  "src/presentation/components/tag/TagTable.tsx"
  "src/presentation/components/tag/TagFormModal.tsx"
  "src/presentation/components/layout/Sidebar.tsx"
  "src/presentation/components/layout/Topbar.tsx"
  "src/presentation/components/layout/MainLayout.tsx"
  "src/presentation/hooks/story/useStories.ts"
  "src/presentation/hooks/story/useStory.ts"
  "src/presentation/hooks/story/useStoryMutation.ts"
  "src/presentation/hooks/chapter/useChapterMutation.ts"
  "src/presentation/hooks/category/useCategories.ts"
  "src/presentation/hooks/category/useCategoryMutation.ts"
  "src/presentation/hooks/tag/useTags.ts"
  "src/presentation/hooks/tag/useTagMutation.ts"
  "src/store/draftStoryStore.ts"
  "src/store/confirmStore.ts"
  "src/lib/cn.ts"
  "src/lib/formatDate.ts"
  "src/lib/slugify.ts"
  "src/routes/index.tsx"
)

# Loop untuk membuat folder dan file
for file in "${files[@]}"; do
  # Ambil nama folder dari path file
  dir=$(dirname "$file")
  
  # Buat folder jika belum ada (-p artinya rekursif)
  mkdir -p "$dir"
  
  # Buat file jika belum ada
  if [ ! -f "$file" ]; then
    touch "$file"
    echo "Created: $file"
  fi
done

echo "Scaffolding selesai!"
