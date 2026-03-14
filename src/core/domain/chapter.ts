export interface Chapter {
  id: string;
  story_id: string;
  title: string;
  content: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ChapterFormPayload {
  title: string;
  content: string;
}
