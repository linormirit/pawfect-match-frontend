import { Flex } from "@mantine/core";

import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({userId}) => {
  const user = getUserById(userId);

  return (
    <Flex>
      <PostHeader
        username={user.username}
        avatarUrl={user.avatarUrl}
      ></PostHeader>
    </Flex>
  );
};

export { Post };
