import { ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@mantine/core";
import { IconPaw, IconPawFilled, IconMessageCircle } from "@tabler/icons-react";

import { Post } from "../../types/post";
import { pawGray, pawGreen } from "../../consts";

const PostFooter: React.FC<Pick<Post, "userId" | "likedBy">> = ({
  userId,
  likedBy,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>();

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
        <ThemeIcon variant={"white"} size={60}>
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
        <ThemeIcon variant={"white"} size={60}>
          <IconMessageCircle
            stroke={1.5}
            cursor={"pointer"}
            style={{ height: "70%", width: "70%" }}
          />
        </ThemeIcon>
      </Flex>
      <Flex align={"center"}>
        <ThemeIcon variant={"white"} size={40}>
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
