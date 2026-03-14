// src/store/draftStoryStore.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { StoryFormValues } from "@/presentation/pages/story/schema";

export interface DraftChapter {
  localId: string;
  title: string;
  content: string;
}

interface DraftStoryState {
  formValues: Partial<StoryFormValues>;
  setFormValues: (values: Partial<StoryFormValues>) => void;

  coverFile: File | null;
  coverPreviewUrl: string;
  setCover: (file: File | null, previewUrl: string) => void;

  chapters: DraftChapter[];
  addChapter: (chapter: Omit<DraftChapter, "localId">) => void;
  updateChapter: (
    localId: string,
    data: Partial<Omit<DraftChapter, "localId">>,
  ) => void;
  removeChapter: (localId: string) => void;
  clearDraft: () => void;
}

const defaultFormValues: Partial<StoryFormValues> = {
  title: "",
  author: "",
  synopsis: "",
  category_id: "",
  tag_ids: [],
  status: "draft",
  cover: null,
};

export const useDraftStoryStore = create<DraftStoryState>((set) => ({
  formValues: defaultFormValues,
  coverFile: null,
  coverPreviewUrl: "",

  setFormValues: (values) =>
    set((s) => ({ formValues: { ...s.formValues, ...values } })),

  setCover: (file, previewUrl) =>
    set({ coverFile: file, coverPreviewUrl: previewUrl }),

  chapters: [],

  addChapter: (data) =>
    set((s) => ({
      chapters: [...s.chapters, { localId: uuidv4(), ...data }],
    })),

  updateChapter: (localId, data) =>
    set((s) => ({
      chapters: s.chapters.map((c) =>
        c.localId === localId ? { ...c, ...data } : c,
      ),
    })),

  removeChapter: (localId) =>
    set((s) => ({
      chapters: s.chapters.filter((c) => c.localId !== localId),
    })),

  clearDraft: () =>
    set({
      formValues: defaultFormValues,
      coverFile: null,
      coverPreviewUrl: "",
      chapters: [],
    }),
}));
