/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

import { User } from "../types/user";

interface UserContextType {
  loggedUser: User | null;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be used within UserProvider");
  }

  return context;
};

export { UserContext, useUser };
