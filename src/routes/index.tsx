// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/presentation/components/layout/MainLayout";
import { DashboardPage } from "@/presentation/pages/dashboard/DashboardPage";
import { StoryListPage } from "@/presentation/pages/story/StoryListPage";
import { StoryDetailPage } from "@/presentation/pages/story/StoryDetailPage";
import { StoryFormPage } from "@/presentation/pages/story/StoryFormPage";
import { ChapterFormPage } from "@/presentation/pages/story/ChapterFormPage";
import { CategoryPage } from "@/presentation/pages/category/CategoryPage";
import { TagPage } from "@/presentation/pages/tag/TagPage";
import { NotFoundPage } from "@/presentation/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },

      // Stories
      { path: "stories", element: <StoryListPage /> },
      { path: "stories/new", element: <StoryFormPage mode="add" /> },
      { path: "stories/:id", element: <StoryDetailPage /> },
      { path: "stories/:id/edit", element: <StoryFormPage mode="edit" /> },

      // Chapters — add story baru (draft)
      {
        path: "stories/new/chapters/new",
        element: <ChapterFormPage mode="add" />,
      },
      {
        path: "stories/new/chapters/:chapterId/edit",
        element: <ChapterFormPage mode="edit" />,
      },

      // Chapters — edit story existing (saved)
      {
        path: "stories/:id/chapters/new",
        element: <ChapterFormPage mode="add" />,
      },
      {
        path: "stories/:id/chapters/:chapterId/edit",
        element: <ChapterFormPage mode="edit" />,
      },

      // Masters
      { path: "categories", element: <CategoryPage /> },
      { path: "tags", element: <TagPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
