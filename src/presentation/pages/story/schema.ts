import { z } from "zod";

export const storySchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  synopsis: z.string().optional(),
  category_id: z.string().optional(),
  tag_ids: z.array(z.string()).optional(),
  status: z.enum(["publish", "draft"]),
  cover: z.instanceof(File).optional().nullable(),
});

export const chapterSchema = z.object({
  title: z.string().min(1, "Judul chapter wajib diisi"),
  content: z.string().min(1, "Konten chapter wajib diisi"),
});

export type StoryFormValues = z.infer<typeof storySchema>;
export type ChapterFormValues = z.infer<typeof chapterSchema>;
