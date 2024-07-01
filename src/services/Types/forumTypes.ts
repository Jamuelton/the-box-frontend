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
  user_id?: number;
  created_at?: Date;
}
