import { User } from "./user";

export interface Post {
  id: string;
  content: string;
  commentCount: number;
  createdAt: string;
  author?: User;
  authorId: string;
}
