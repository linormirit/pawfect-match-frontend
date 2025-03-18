import { isNil } from "lodash";
import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader, Stack, TextInput, ThemeIcon } from "@mantine/core";

import {
  createComment,
  fetchCommentsByPostId,
} from "../../services/comment-service";
import { Comment } from "../posts/comment";
import { useUser } from "../../contexts/user-context";
import { commentPlaceholderText } from "../../strings";
import { Comment as CommentType } from "../../types/comment";

const Comments: React.FC<{ postId: string }> = ({ postId }) => {
  const { token } = useUser();
  const [commentText, setCommentText] = useState("");

  const {
    data: comments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useQuery<CommentType[], Error>({
    queryKey: ["fetchComments"],
    queryFn: () => fetchCommentsByPostId(token, postId),
    enabled: !isNil(token),
  });

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

  return (
    !isNil(comments) &&
    (!isLoadingComments ? (
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
    ))
  );
};

export { Comments };
