import { useEffect, useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { Stack, TextInput, ThemeIcon } from "@mantine/core";

import { Comment } from "../posts/comment";
import { commentPlaceholderText } from "../../strings";
import { Comment as CommentType } from "../../types/comment";
import { getCommentsByPostId } from "../../services/comment-service";

const Comments: React.FC<{ postId: string; username: string }> = ({
  postId,
  username,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(getCommentsByPostId(postId));
  }, [postId]);

  return (
    <Stack justify={"center"}>
      {comments.map((comment) => (
        <Comment content={comment.content} username={username} />
      ))}
      <TextInput
        value={commentText}
        style={{ position: "relative" }}
        placeholder={commentPlaceholderText}
        onChange={(event) => setCommentText(event.currentTarget.value)}
      />
      <ThemeIcon
        size={36}
        variant={"transparent"}
        style={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <IconSend
          stroke={1.5}
          cursor={"pointer"}
          style={{ height: "70%", width: "70%" }}
        />
      </ThemeIcon>
    </Stack>
  );
};

export { Comments };
