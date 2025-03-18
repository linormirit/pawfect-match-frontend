import { User } from "../types/user";
import { serverBaseUrl } from "../consts";
import { TokenResponse } from "../types/token-response";

const userApi = {
  fetchToken: `${serverBaseUrl}/auth/login`,
  fetchUserById: `${serverBaseUrl}/users`,
  register: `${serverBaseUrl}/auth/register`,
  fetchUsers: `${serverBaseUrl}/users`,
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

const register = async ({
  email,
  username,
  password,
  avatarURL,
}: {
  email: string;
  username: string,
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

export { fetchToken, fetchUserById, register, fetchUsers };
