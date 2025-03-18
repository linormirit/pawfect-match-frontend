import { Post } from "../types/post";
import { serverBaseUrl } from "../consts";

const likeApi = {
  updateLikeStatus: `${serverBaseUrl}/posts/like`,
};

const updateLikeStatus = async ({
  token,
  postId,
}: {
  token: string;
  postId: string;
}): Promise<Post> => {
  const response = await fetch(`${likeApi.updateLikeStatus}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update like status");
  }

  return response.json();
};

export { updateLikeStatus };
