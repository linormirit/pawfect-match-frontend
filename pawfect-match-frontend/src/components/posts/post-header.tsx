import { Flex, Avatar, Text } from "@mantine/core";

import { User } from "../../types/user";

const PostHeader: React.FC<Partial<User>> = ({ username, avatarUrl }) => {
  return (
    <Flex>
      <Avatar radius={"xl"} src={avatarUrl} />
      <Text size={"md"}>{username}</Text>
    </Flex>
  );
};

export { PostHeader };
