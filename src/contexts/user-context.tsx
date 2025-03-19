/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

import { User } from "../types/user";

interface UserContextType {
  token: string;
  loggedUser: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
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
