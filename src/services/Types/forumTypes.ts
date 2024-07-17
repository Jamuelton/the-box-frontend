export enum CategoryEnum {
  "TECHNOLOGY",
  "UNIVERSITY",
  "LIFESTYLE",
  "RESEARCH",
}

export interface ForumInterface {
  id?: number;
  title?: string;
  content?: string;
  category?: CategoryEnum;
  user_id?: number;
}
