export interface DashboardSummary {
  total_stories: number;
  total_published: number;
  total_draft: number;
  total_chapters: number;
  total_categories: number;
  total_tags: number;
}

export interface StoriesPerCategory {
  category_id: string;
  category_name: string;
  category_slug: string;
  total: number;
}

export interface StoriesPerStatus {
  status: "publish" | "draft";
  total: number;
}

export interface TopTag {
  tag_id: string;
  tag_name: string;
  tag_slug: string;
  total: number;
}

export interface RecentStory {
  id: string;
  title: string;
  author: string;
  status: "publish" | "draft";
  cover_url: string;
  category_name: string;
  created_at: string;
}

export interface RecentChapter {
  id: string;
  title: string;
  story_id: string;
  story_title: string;
  updated_at: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  stories_per_category: StoriesPerCategory[];
  stories_per_status: StoriesPerStatus[];
  top_tags: TopTag[];
  recent_stories: RecentStory[];
  recent_chapters: RecentChapter[];
}
