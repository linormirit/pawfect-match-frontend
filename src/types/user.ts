interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  avatarURL: string;
  timestamp: Date;
}

export type { User };
