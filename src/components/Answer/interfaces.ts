export interface IAnswer {
    title?: string;
    commentator?: string;
    body?: string;
    likes?: number;
    id?: number;
    user_id?: number;
    post_id?: number;
    liked?: boolean;
    isAuthor?: boolean;
}