import { User } from "../types/user";

const getUserById = (userId: string): User => {
  const user: User = {
    id: userId,
    username: "dog_lover",
    avatarUrl: "url",
    email: "user@gamil.com",
    lastUpdate: new Date(),
  };

  return user;
};

export { getUserById };
