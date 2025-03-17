import { isEmpty, isNil } from "lodash";
import { Card, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { User } from "../../types/user";
import { PostFooter } from "./post-footer";
import { PostHeader } from "./post-header";
import { serverBaseUrl } from "../../consts";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { fetchUserById } from "../../services/user-service";

const Post: React.FC<
  PostType & { postSize: number; view: "profile" | "feed" }
> = ({ _id, userId, imageURL, content, likeBy, postSize, view }) => {
  const { token, loggedUser } = useUser();

  const { data: postUser } = useQuery<User, Error>({
    queryKey: ["fetchPostUserById", userId],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  console.log(postUser);

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
          {view === "feed" && (
            <PostHeader
              username={postUser.username}
              avatarURL={postUser.avatarURL}
            ></PostHeader>
          )}
        </Card.Section>
        <Card.Section>
          <Image src={`${serverBaseUrl}${imageURL}`} height={320} />
        </Card.Section>
        <Card.Section>
          {view === "feed" && (
            <PostFooter
              _id={_id}
              likeBy={likeBy}
              content={content}
              loggedUserId={loggedUser._id}
              postUsername={postUser.username}
            />
          )}
        </Card.Section>
      </Card>
    )
  );
};

export { Post };
