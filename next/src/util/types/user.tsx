export interface User {
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  email: string;
  password: string;
  id: string;
  isLoading?: boolean;
  authed: boolean;
}

export interface UnauthedUser {
  isLoading?: boolean;
  authed: boolean;
}
