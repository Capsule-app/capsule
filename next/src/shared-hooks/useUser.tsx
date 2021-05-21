import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { User } from "util/types/user";

interface Props {
  children?: React.ReactNode;
}

interface Context {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const queryClient = new QueryClient();
export const UserContext = createContext<Context>({
  user: null,
  setUser: () => null,
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>({ isLoading: true });

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
