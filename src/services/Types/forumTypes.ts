export enum CategoryEnum {
  "TECHNOLOGY",
  "UNIVERSITY",
  "LIFESTYLE",
  "RESEARCH",
}

export interface ForumInterface {
  title?: string;
  content?: string;
  category?: CategoryEnum;
  user_id?: number | undefined;
  created_at?: Date;
  original_poster?: string;
}
