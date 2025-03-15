import { isNil } from "lodash";
import { Card, Flex, Image, Text } from "@mantine/core";

import { PostHeader } from "./post-header";
import { PostFooter } from "./post-footer";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";

const Post: React.FC<PostType> = ({
  id,
  userId,
  imageUrl,
  content,
  likedBy,
}) => {
  const { loggedUser } = useUser();

  console.log(loggedUser);

  return (
    !isNil(loggedUser) && (
      <Card shadow={"sm"} padding={"lg"} radius={"md"} w={"36vw"} withBorder>
        <Card.Section>
          <PostHeader
            username={loggedUser.username}
            avatarUrl={loggedUser.avatarUrl}
          ></PostHeader>
        </Card.Section>
        <Card.Section>
          <Image src={imageUrl} height={500} />
        </Card.Section>
        <Card.Section>
          <PostFooter
            id={id}
            userId={userId}
            likedBy={likedBy}
            username={loggedUser.username}
          />
          <Flex align={"center"} gap={"sm"} px={"sm"}>
            <Text style={{ fontWeight: "bold" }}>{loggedUser.username}</Text>
            <Text>{content}</Text>
          </Flex>
        </Card.Section>
      </Card>
    )
  );
};

export { Post };
