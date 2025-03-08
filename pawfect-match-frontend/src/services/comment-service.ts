import { Comment } from "../types/comment";

const getCommentsByPostId = (postId: string): Comment[] => {
  const comments: Comment[] = [
    {
      id: "1",
      postId: postId,
      userId: "1",
      content: "So cute! I would like to discuss more details",
      timestamp: new Date(),
    },
    {
      id: "2",
      postId: postId,
      userId: "1",
      content: "He's very friendly, good with kids and answers to Maxi",
      timestamp: new Date(),
    },
    {
      id: "3",
      postId: postId,
      userId: "1",
      content: "Sounds great! let's meet up",
      timestamp: new Date(),
    },
    {
      id: "4",
      postId: postId,
      userId: "1",
      content: "OK!",
      timestamp: new Date(),
    },
  ];
  return comments;
};

export { getCommentsByPostId };
