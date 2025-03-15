import { Card, Flex, Image, Text } from "@mantine/core";
import { isNil } from "lodash";

import { serverBaseUrl } from "../../consts";
import { useUser } from "../../contexts/user-context";
import { Post as PostType } from "../../types/post";
import { PostFooter } from "./post-footer";
import { PostHeader } from "./post-header";

const Post: React.FC<PostType> = ({
  _id,
  userId,
  imageURL,
  content,
  likeBy,
}) => {
  const { loggedUser } = useUser();

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
          <Image src={`${serverBaseUrl}${imageURL}`} height={500} />
        </Card.Section>
        <Card.Section>
          <PostFooter
            _id={_id}
            userId={userId}
            likeBy={likeBy}
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

