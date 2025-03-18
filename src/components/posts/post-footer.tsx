import { isNil } from "lodash";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, ThemeIcon } from "@mantine/core";
import { Flex, Stack, Text } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconPaw, IconPawFilled, IconMessageCircle } from "@tabler/icons-react";

import { Comments } from "./comments";
import { Post } from "../../types/post";
import { pawGray, pawGreen } from "../../consts";
import { useUser } from "../../contexts/user-context";
import { Comment as CommentType } from "../../types/comment";
import { updateLikeStatus } from "../../services/like-service";
import { fetchCommentsByPostId } from "../../services/comment-service";

const PostFooter: React.FC<
  Pick<Post, "_id" | "likeBy" | "content"> & {
    loggedUserId: string;
    postUsername: string;
  }
> = ({ _id, likeBy, loggedUserId, content, postUsername }) => {
  const { token } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>(
    likeBy?.includes(loggedUserId)
  );
  const [commentsOpened, { open, close }] = useDisclosure(false);
  const [likeCount, setLikeCount] = useState<number>(likeBy?.length ?? 0);

  const { mutate: mutateUpdateLike } = useMutation<
    Post,
    Error,
    { token: string; postId: string }
  >({
    mutationFn: updateLikeStatus,
  });

  const {
    data: comments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useQuery<CommentType[], Error>({
    queryKey: ["fetchComments"],
    queryFn: () => fetchCommentsByPostId(token, _id),
    enabled: !isNil(token),
  });

  const commentCount = useMemo(() => comments?.length, [comments]);

  const handlePawClick = () => {
    setIsLiked((isLiked) => !isLiked);
    setLikeCount((likeCount) => (isLiked ? likeCount - 1 : likeCount + 1));
    mutateUpdateLike({ token, postId: _id });
  };

  return (
    <Stack justify={"center"} gap={2}>
      <Flex>
        <ThemeIcon variant={"transparent"} size={60}>
          {isLiked ? (
            <IconPawFilled
              stroke={1.5}
              color={pawGreen}
              cursor={"pointer"}
              onClick={handlePawClick}
              style={{ height: "70%", width: "70%" }}
            />
          ) : (
            <IconPaw
              stroke={1.5}
              color={pawGray}
              cursor={"pointer"}
              onClick={handlePawClick}
              style={{ height: "70%", width: "70%" }}
            />
          )}
        </ThemeIcon>
        <ThemeIcon variant={"transparent"} size={60}>
          <IconMessageCircle
            stroke={1.5}
            cursor={"pointer"}
            onClick={open}
            style={{ height: "70%", width: "70%" }}
          />
        </ThemeIcon>
        <Modal opened={commentsOpened} onClose={close} size={500}>
          {!isNil(comments) && (
            <Comments
              postId={_id}
              comments={comments}
              refetchComments={refetchComments}
              isLoadingComments={isLoadingComments}
            />
          )}
        </Modal>
      </Flex>
      <Flex align={"center"}>
        <Flex align={"center"}>
          <ThemeIcon variant={"transparent"} size={40}>
            <IconPawFilled
              stroke={1.5}
              color={pawGray}
              style={{ height: "70%", width: "70%" }}
            />
          </ThemeIcon>
          <Text>{`${likeCount} paws`}</Text>
        </Flex>
        <Flex align={"center"}>
          <ThemeIcon variant={"transparent"} size={40}>
            <IconMessageCircle
              stroke={1.5}
              color={pawGray}
              style={{ height: "70%", width: "70%" }}
            />
          </ThemeIcon>
          <Text>{`${commentCount} comments`}</Text>
        </Flex>
      </Flex>
      <Flex align={"center"} gap={"sm"} px={"sm"}>
        <Text style={{ fontWeight: "bold" }}>{postUsername}</Text>
        <Text>{content}</Text>
      </Flex>
    </Stack>
  );
};

export { PostFooter };
