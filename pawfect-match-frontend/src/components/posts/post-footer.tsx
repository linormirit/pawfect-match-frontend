import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, ThemeIcon } from "@mantine/core";
import { Flex, Stack, Text } from "@mantine/core";
import { IconPaw, IconPawFilled, IconMessageCircle } from "@tabler/icons-react";

import { Comments } from "./comments";
import { Post } from "../../types/post";
import { pawGray, pawGreen } from "../../consts";

const PostFooter: React.FC<
  Pick<Post, "id" | "userId" | "likedBy"> & { username: string }
> = ({ id, userId, likedBy, username }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [commentsOpened, { open, close }] = useDisclosure(false);

  const handlePawClick = () => {
    setIsLiked((isLiked) => !isLiked);
  };

  useEffect(() => {
    const isLikedByUser = likedBy.includes(userId);
    setIsLiked(isLikedByUser);
  }, [userId, likedBy]);

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
          <Comments postId={id} username={username} />
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
        <Text>{`${likedBy.length} paws`}</Text>
      </Flex>
    </Stack>
  );
};

export { PostFooter };
