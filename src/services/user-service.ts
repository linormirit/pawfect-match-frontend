import { CredentialResponse } from "@react-oauth/google";

import { User } from "../types/user";
import { serverBaseUrl } from "../consts";
import { TokenResponse } from "../types/token-response";

const userApi = {
  fetchToken: `${serverBaseUrl}/auth/login`,
  fetchUserById: `${serverBaseUrl}/users`,
  register: `${serverBaseUrl}/auth/register`,
  fetchUsers: `${serverBaseUrl}/users`,
  updateUserById: `${serverBaseUrl}/users`,
  googleLogIn: `${serverBaseUrl}/auth/google`,
};

const fetchToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TokenResponse> => {
  const response = await fetch(userApi.fetchToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  return response.json();
};

const fetchUserById = async (
  userId: string,
  token: string | undefined
): Promise<User> => {
  const response = await fetch(`${userApi.fetchUserById}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token ?? "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

const updateUserById = async ({
  token,
  user,
}: {
  token: string | undefined;
  user: Pick<User, "_id" | "avatarURL" | "username">;
}): Promise<User> => {
  const response = await fetch(`${userApi.updateUserById}/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token ?? "",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return response.json();
};

const register = async ({
  email,
  username,
  password,
  avatarURL,
}: {
  email: string;
  username: string;
  password: string;
  avatarURL: string;
}): Promise<TokenResponse> => {
  const response = await fetch(userApi.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password, avatarURL }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
};

const googleLogIn = async (
  googleResponse: CredentialResponse
): Promise<TokenResponse> => {
  const response = await fetch(userApi.googleLogIn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(googleResponse),
  });

  if (!response.ok) {
    throw new Error("Failed to log in with Google");
  }

  return response.json();
};

const fetchUsers = async (token: string): Promise<User[]> => {
  const response = await fetch(userApi.fetchUsers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export {
  fetchToken,
  fetchUserById,
  register,
  fetchUsers,
  updateUserById,
  googleLogIn,
};
