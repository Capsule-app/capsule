import { Space } from "./space";
import { User } from "./user";
import { Vote } from "./vote";

export interface Post {
  id: string;
  content: string;
  commentCount: number;
  createdAt: string;
  author?: User;
  authorId: string;
  space?: Space;
  votes?: Vote[];
}
