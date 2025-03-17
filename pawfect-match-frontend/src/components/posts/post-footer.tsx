import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, ThemeIcon } from "@mantine/core";
import { Flex, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { IconPaw, IconPawFilled, IconMessageCircle } from "@tabler/icons-react";

import { Comments } from "./comments";
import { Post } from "../../types/post";
import { pawGray, pawGreen } from "../../consts";
import { useUser } from "../../contexts/user-context";
import { updateLikeStatus } from "../../services/like-service";

const PostFooter: React.FC<
  Pick<Post, "_id" | "likeBy"> & { loggedUserId: string }
> = ({ _id, likeBy, loggedUserId }) => {
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

  const handlePawClick = () => {
    setIsLiked((isLiked) => !isLiked);
    setLikeCount((likeCount) => (isLiked ? likeCount - 1 : likeCount + 1));
    mutateUpdateLike({ token, postId: _id });
  };

  return (
    <Stack justify={"center"}>
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
          <Comments postId={_id} />
        </Modal>
      </Flex>
      <Flex align={"center"}>
        <ThemeIcon variant={"transparent"} size={40}>
          <IconPawFilled
            stroke={1.5}
            color={pawGray}
            cursor={"pointer"}
            style={{ height: "70%", width: "70%" }}
          />
        </ThemeIcon>
        <Text>{`${likeCount} paws`}</Text>
      </Flex>
    </Stack>
  );
};

export { PostFooter };
