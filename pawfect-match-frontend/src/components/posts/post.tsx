import { Card, Image } from "@mantine/core";

import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({ userId, imageUrl }) => {
  const user = getUserById(userId);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <PostHeader
          username={user.username}
          avatarUrl={user.avatarUrl}
        ></PostHeader>
      </Card.Section>
      <Card.Section>
        <Image src={imageUrl} height={160} />
      </Card.Section>
    </Card>
  );
};

export { Post };
