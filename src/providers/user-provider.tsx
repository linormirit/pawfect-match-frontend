import { isEmpty, isNil } from "lodash";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useMemo, useState } from "react";

import {
  fetchToken,
  googleLogIn,
  fetchUserById,
} from "../services/user-service";
import { User } from "../types/user";
import { UserContext } from "../contexts/user-context";
import { TokenResponse } from "../types/token-response";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [googleResponse, setGoogleResponse] =
    useState<CredentialResponse | null>(null);

  const {
    data: tokenData,
    error: tokenError,
    isPending: tokenLoading,
    mutate: mutateToken,
  } = useMutation<TokenResponse, Error, { email: string; password: string }>({
    mutationFn: fetchToken,
  });

  const {
    data: googleTokenData,
    error: googleTokenError,
    isPending: googleTokenLoading,
    mutate: mutateGoogleToken,
  } = useMutation<TokenResponse, Error, CredentialResponse>({
    mutationFn: googleLogIn,
  });

  const userId = useMemo(
    () => tokenData?._id ?? googleTokenData?._id ?? "",
    [tokenData, googleTokenData]
  );

  const {
    isSuccess,
    data: userData,
    error: userError,
    isFetching: userLoading,
  } = useQuery<User, Error>({
    queryKey: ["fetchUserById", userId],
    queryFn: () => fetchUserById(userId, token?.accessToken),
    enabled: !isEmpty(userId) && !isEmpty(token?.accessToken),
  });

  const loading = useMemo(
    () => tokenLoading || userLoading || googleTokenLoading,
    [tokenLoading, userLoading, googleTokenLoading]
  );

  const errorToDisplay = useMemo<string>(() => {
    if (!isEmpty(email) && !isEmpty(password)) {
      return tokenError
        ? "Email or password are incorrect"
        : userError
        ? "Oops something went wrong"
        : googleTokenError
        ? "Google login error"
        : "";
    } else {
      return "";
    }
  }, [email, password, tokenError, googleTokenError, userError]);

  const login = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  const logout = () => {
    setEmail("");
    setPassword("");
    navigate("/");
    setLoggedUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokenData");
  };

  useEffect(() => {
    if (email && password) {
      mutateToken({ email, password });
    }
  }, [mutateToken, email, password]);

  useEffect(() => {
    if (!isNil(googleResponse)) {
      mutateGoogleToken(googleResponse);
    }
  }, [mutateGoogleToken, googleResponse]);

  useEffect(() => setLoggedUser(userData ?? null), [userData]);
  useEffect(
    () => setToken(tokenData ?? googleTokenData ?? null),
    [tokenData, googleTokenData]
  );

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem(
        "tokenData",
        JSON.stringify(tokenData ?? googleTokenData)
      );
    }
  }, [tokenData, googleTokenData, userData, isSuccess]);

  useEffect(() => {
    if (loggedUser && isSuccess) {
      navigate("/overview");
    }
  }, [navigate, loggedUser, isSuccess]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const token = JSON.parse(localStorage.getItem("tokenData") ?? "{}");

    if (!isEmpty(user)) {
      setLoggedUser(user);
    }

    if (!isEmpty(token)) {
      setToken(token);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        loading,
        loggedUser,
        error: errorToDisplay,
        token: token?.accessToken ?? "",
        setLoggedUser,
        googleResponse,
        setGoogleResponse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
