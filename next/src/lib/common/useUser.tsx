import { createContext, useState } from "react";
import { User, UnauthedUser } from "util/types/user";

interface Context {
  user: User | null;
  setUser: (user: User | UnauthedUser | null) => void;
}

export const UserContext = createContext<Context>({
  user: null,
  setUser: () => null,
});

export const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>({ isLoading: true });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
