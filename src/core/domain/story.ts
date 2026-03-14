import type { Category } from "./category";
import type { Tag } from "./tag";
import type { Chapter } from "./chapter";

export type StoryStatus = "publish" | "draft";

export interface Story {
  id: string;
  category_id: string | null;
  title: string;
  author: string;
  synopsis: string;
  cover_url: string;
  status: StoryStatus;
  created_at: string;
  updated_at: string;
}

export interface StoryDetail extends Story {
  category: Category | null;
  tags: Tag[];
  chapters?: Chapter[];
}

export interface StoryFilter {
  search?: string;
  category_id?: string;
  status?: StoryStatus | "";
  page?: number;
  limit?: number;
}

export interface StoryFormPayload {
  category_id?: string;
  title: string;
  author: string;
  synopsis?: string;
  tag_ids?: string[];
  status: StoryStatus;
  cover?: File;
}
