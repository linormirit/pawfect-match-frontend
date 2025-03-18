import { serverBaseUrl } from "../consts";
import { Comment } from "../types/comment";

const commentApi = {
  createComment: `${serverBaseUrl}/comments`,
  fetchCommentsByPostId: `${serverBaseUrl}/comments`,
};

const createComment = async ({
  token,
  postId,
  content,
}: {
  token: string;
  postId: string;
  content: string;
}): Promise<Comment> => {
  const response = await fetch(commentApi.createComment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ postId, content }),
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }

  return response.json();
};

const fetchCommentsByPostId = async (
  token: string,
  postId: string
): Promise<Comment[]> => {
  const response = await fetch(
    `${commentApi.fetchCommentsByPostId}?postId=${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export { createComment, fetchCommentsByPostId };
