import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { User } from "../types/user";
import { UserContext } from "../contexts/user-context";
import { TokenResponse } from "../types/token-response";
import { fetchToken, fetchUserById } from "../services/user-service";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const {
    data: tokenData,
    error: tokenError,
    isPending: tokenLoading,
    mutate: mutateToken,
  } = useMutation<TokenResponse, Error, { email: string; password: string }>({
    mutationFn: fetchToken,
  });

  const token = useMemo(() => tokenData?.accessToken ?? "", [tokenData]);
  const userId = useMemo(() => tokenData?._id ?? "", [tokenData]);

  const {
    isSuccess,
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<User, Error>({
    queryKey: ["fetchUserById"],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  const loggedUser = useMemo(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");

    if (!isEmpty(user)) {
      return user;
    } else {
      return userData ?? null;
    }
  }, [userData]);

  const loading = useMemo(
    () => tokenLoading || userLoading,
    [tokenLoading, userLoading]
  );

  const errorToDisplay = useMemo<string>(() => {
    if (!isEmpty(email) && !isEmpty(password)) {
      return tokenError
        ? "Email or password are incorrect"
        : userError
        ? "Oops something went wrong"
        : "";
    } else {
      return "";
    }
  }, [email, password, tokenError, userError]);

  const login = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  const logout = () => {
    setEmail("");
    setPassword("");
    navigate("/");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (email && password) {
      mutateToken({ email, password });
    }
  }, [mutateToken, email, password]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(loggedUser));
    }
  }, [loggedUser, isSuccess]);

  return (
    <UserContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
        isSuccess,
        loggedUser,
        error: errorToDisplay,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
