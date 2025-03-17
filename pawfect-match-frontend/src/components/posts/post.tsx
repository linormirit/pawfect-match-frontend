import { isEmpty, isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Image, Text } from "@mantine/core";

import { User } from "../../types/user";
import { PostFooter } from "./post-footer";
import { PostHeader } from "./post-header";
import { serverBaseUrl } from "../../consts";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { fetchUserById } from "../../services/user-service";

const Post: React.FC<PostType & { postSize: number }> = ({
  _id,
  userId,
  imageURL,
  content,
  likeBy,
  postSize,
}) => {
  const { token, loggedUser } = useUser();
  const { data: postUser } = useQuery<User, Error>({
    queryKey: ["fetchPostUserById"],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  return (
    !isNil(postUser) &&
    !isNil(loggedUser) && (
      <Card
        w={postSize}
        h={postSize}
        shadow={"sm"}
        padding={"lg"}
        radius={"md"}
        withBorder
      >
        <Card.Section>
          <PostHeader
            username={postUser.username}
            avatarURL={postUser.avatarURL}
          ></PostHeader>
        </Card.Section>
        <Card.Section>
          <Image src={`${serverBaseUrl}${imageURL}`} height={320} />
        </Card.Section>
        <Card.Section>
          <PostFooter
            _id={_id}
            likeBy={likeBy}
            loggedUserId={loggedUser?._id}
          />
          <Flex align={"center"} gap={"sm"} px={"sm"}>
            <Text style={{ fontWeight: "bold" }}>{postUser?.username}</Text>
            <Text>{content}</Text>
          </Flex>
        </Card.Section>
      </Card>
    )
  );
};

export { Post };
