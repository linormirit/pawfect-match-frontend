import { User } from "../types/user";
import { serverBaseUrl } from "../consts";
import { TokenResponse } from "../types/token-response";

const userApi = {
  fetchToken: `${serverBaseUrl}/auth/login`,
  fetchUserById: `${serverBaseUrl}/users`,
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

export default fetchToken;

export { fetchToken, fetchUserById };
