/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

import { User } from "../types/user";

interface UserContextType {
  token: string;
  loggedUser: User | null;
  loading: boolean;
  isSuccess: boolean;
  error: string;
  login: (email: string, password: string) => void;
  logout: () => void;
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
