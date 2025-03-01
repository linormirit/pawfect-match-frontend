import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { Card, Flex, Image, Text } from "@mantine/core";

import { User } from "../../types/user";
import { PostHeader } from "./post-header";
import { PostFooter } from "./post-footer";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({ userId, imageUrl, content, likedBy }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(getUserById(userId));
  }, [userId]);

  return (
    !isNil(user) && (
      <Card shadow={"sm"} padding={"lg"} radius={"md"} w={"36vw"} withBorder>
        <Card.Section>
          <PostHeader
            username={user.username}
            avatarUrl={user.avatarUrl}
          ></PostHeader>
        </Card.Section>
        <Card.Section>
          <Image src={imageUrl} height={500} />
        </Card.Section>
        <Card.Section>
          <PostFooter userId={userId} likedBy={likedBy} />
          <Flex align={"center"} gap={"sm"} px={"sm"}>
            <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
            <Text>{content}</Text>
          </Flex>
        </Card.Section>
      </Card>
    )
  );
};

export { Post };
