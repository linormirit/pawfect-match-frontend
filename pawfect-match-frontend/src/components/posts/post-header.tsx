import { Flex, Image, Text } from "@mantine/core";

import { User } from "../../types/user";

const PostHeader: React.FC<Partial<User>> = ({ username, avatarUrl }) => {
  return (
    <Flex>
      <Image radius="xl" h={80} src={avatarUrl} />
      <Text size="md">{username}</Text>
    </Flex>
  );
};

export { PostHeader };
