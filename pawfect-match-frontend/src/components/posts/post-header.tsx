import { Flex, Avatar, Text } from "@mantine/core";

import { User } from "../../types/user";
import { serverBaseUrl } from "../../consts";

const PostHeader: React.FC<Pick<User, "username" | "avatarURL">> = ({
  username,
  avatarURL,
}) => {
  return (
    <Flex align={"center"} h={80} ml={"sm"} gap={"sm"}>
      <Avatar radius={"xl"} size={60} src={`${serverBaseUrl}/${avatarURL}`} />
      <Text size={"xl"}>{username}</Text>
    </Flex>
  );
};

export { PostHeader };
