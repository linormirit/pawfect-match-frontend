import { useState } from "react";
import { IconSend } from "@tabler/icons-react";
import { Stack, TextInput, ThemeIcon } from "@mantine/core";

import { Comment } from "../posts/comment";
import { commentPlaceholderText } from "../../strings";
import { Comment as CommentType } from "../../types/comment";

const Comments: React.FC<{ postId: string;}> = () => {
  const comments: CommentType[] = [];
  const [commentText, setCommentText] = useState("");

  const handleComment = () => {
    setCommentText("");
  };

  return (
    <Stack justify={"center"}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          username={'username'}
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
              onClick={handleComment}
            />
          </ThemeIcon>
        }
        onKeyDown={(event) => event.key === "Enter" && handleComment()}
        onChange={(event) => setCommentText(event.currentTarget.value)}
      />
    </Stack>
  );
};

export { Comments };
