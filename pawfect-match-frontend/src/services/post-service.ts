import { serverBaseUrl } from "../consts";
import { Post } from "../types/post";

const postApi = {
  fetchPosts: `${serverBaseUrl}/posts`,
  createPost: `${serverBaseUrl}/posts`,
};

const fetchPosts = async (token: string): Promise<Post[]> => {
  const response = await fetch(postApi.fetchPosts, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const createPost = async ({
  token,
  post,
}: {
  token: string;
  post: Pick<Post, "content" | "breed" | "imageUrl">;
}): Promise<Post> => {
  const response = await fetch(postApi.createPost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export { fetchPosts, createPost };
