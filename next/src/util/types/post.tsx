import { User } from "./user";

export interface Post {
  id: string;
  content: string;
  author?: User;
  authorId: string;
  createdAt: string;
}
