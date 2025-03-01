import { Flex, Avatar, Text } from "@mantine/core";

import { User } from "../../types/user";

const PostHeader: React.FC<Pick<User, "username" | "avatarUrl">> = ({
  username,
  avatarUrl,
}) => {
  return (
    <Flex align={"center"} h={80} ml={6} gap={6}>
      <Avatar radius={"xl"} size={60} src={avatarUrl} />
      <Text size={"xl"}>{username}</Text>
    </Flex>
  );
};

export { PostHeader };
