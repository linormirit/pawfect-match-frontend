import { Flex } from "@mantine/core";
import { ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPawFilled } from "@tabler/icons-react";

import { Post } from "../../types/post";
import { pawGreen } from "../../consts";

const PostFooter: React.FC<Pick<Post, "userId" | "likedBy">> = ({
  userId,
  likedBy,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handlePawClick = () => {
    setIsLiked((isLiked) => !isLiked);
  };

  useEffect(() => {
    const isLikedByUser = likedBy.includes(userId);
    setIsLiked(isLikedByUser);
  }, [userId, likedBy]);

  return (
    <Flex>
      <ThemeIcon variant="white" size={64} color={"dark"}>
        <IconPawFilled
          stroke={1.5}
          cursor={"pointer"}
          onClick={handlePawClick}
          color={isLiked ? pawGreen : "dark"}
          style={{ height: "70%", width: "70%" }}
        />
      </ThemeIcon>
    </Flex>
  );
};

export { PostFooter };
