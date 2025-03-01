import { Card, Image } from "@mantine/core";

import { PostHeader } from "./post-header";
import { PostFooter } from "./post-footer";
import { Post as PostType } from "../../types/post";
import { getUserById } from "../../services/user-service";

const Post: React.FC<PostType> = ({ userId, imageUrl, content }) => {
  const user = getUserById(userId);

  return (
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
      <Card.Section withBorder>
        <PostFooter content={content}/>
      </Card.Section>
    </Card>
  );
};

export { Post };
