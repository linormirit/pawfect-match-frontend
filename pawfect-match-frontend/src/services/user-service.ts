import { User } from "../types/user";

const getUserById = (userId: string): User => {
  const user: User = {
    id: userId,
    username: "dog_lover",
    avatarUrl: "url",
    email: "user@gamil.com",
    password: "",
    lastUpdate: new Date(),
  };

  return user;
};

const getUserByEmail = (email: string): User => {
  const user: User = {
    id: "1",
    username: "dog_lover",
    avatarUrl: "url",
    email: email,
    password: "",
    lastUpdate: new Date(),
  };

  return user;
};

export { getUserById, getUserByEmail };
