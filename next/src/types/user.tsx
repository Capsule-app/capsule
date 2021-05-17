export interface User {
  name: string;
  username: string;
  picture?: string;
  bio?: string;
  email: string;
  password: string;
  id: string;
  isLoading?: boolean;
  error?: any;
}
