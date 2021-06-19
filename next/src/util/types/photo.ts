import { User } from "./user";

export type Photo = {
  id?: string;
  url: string;
  author: User;
};
