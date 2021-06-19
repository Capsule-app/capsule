import { Photo } from "./photo";

export type User = {
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  email: string;
  password: string;
  id: string;
  isLoading?: boolean;
  photo?: Photo;
  authed: boolean;
};

export interface UnauthedUser {
  isLoading?: boolean;
  authed: boolean;
}
