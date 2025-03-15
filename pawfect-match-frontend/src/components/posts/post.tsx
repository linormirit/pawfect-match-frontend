import { isEmpty, isNil } from "lodash";
import { Card, Flex, Image, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { User } from "../../types/user";
import { PostFooter } from "./post-footer";
import { PostHeader } from "./post-header";
import { serverBaseUrl } from "../../consts";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { fetchUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({
  _id,
  userId,
  imageURL,
  content,
  likeBy,
}) => {
  const { token } = useUser();
  const { data: postUser } = useQuery<User, Error>({
    queryKey: ["fetchPostUserById"],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  return (
    !isNil(postUser) && (
      <Card shadow={"sm"} padding={"lg"} radius={"md"} w={"36vw"} withBorder>
        <Card.Section>
          <PostHeader
            username={postUser.username}
            avatarURL={postUser.avatarURL}
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
