export interface User {
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  email: string;
  password: string;
  id: string;
  isLoading?: boolean;
}
