import {
  useMutation,
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { Loader, Stack, TextInput, ThemeIcon } from "@mantine/core";

import { Comment } from "../posts/comment";
import { useUser } from "../../contexts/user-context";
import { commentPlaceholderText } from "../../strings";
import { Comment as CommentType } from "../../types/comment";
import { createComment } from "../../services/comment-service";

const Comments: React.FC<{
  postId: string;
  comments: CommentType[];
  refetchComments: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CommentType[], Error>>;
  isLoadingComments: boolean;
}> = ({ postId, comments, refetchComments, isLoadingComments }) => {
  const { token } = useUser();
  const [commentText, setCommentText] = useState("");

  const { mutate: mutateCreateComment } = useMutation<
    CommentType,
    Error,
    { token: string; postId: string; content: string }
  >({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentText("");
      refetchComments();
    },
  });

  const handleSendComment = () => {
    mutateCreateComment({ token, postId, content: commentText });
  };

  return !isLoadingComments ? (
    <Stack justify={"center"}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          userId={comment.userId}
        />
      ))}
      <TextInput
        value={commentText}
        placeholder={commentPlaceholderText}
        rightSection={
          <ThemeIcon size={36} variant={"transparent"}>
            <IconSend
              stroke={1.5}
              cursor={"pointer"}
              style={{ height: "70%", width: "70%" }}
              onClick={handleSendComment}
            />
          </ThemeIcon>
        }
        onKeyDown={(event) => event.key === "Enter" && handleSendComment()}
        onChange={(event) => setCommentText(event.currentTarget.value)}
      />
    </Stack>
  ) : (
    <Loader />
  );
};

export { Comments };
