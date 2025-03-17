import { isNil } from "lodash";
import { Flex, Stack } from "@mantine/core";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";

const PostsList: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  return (
    !isNil(posts) && (
      <Flex mt={"xl"}>
        <Stack justify={"center"} align={"center"}>
          {posts.map((post) => (
            <Post
              _id={post._id}
              key={post._id}
              userId={post.userId}
              content={post.content}
              breed={post.breed}
              imageURL={post.imageURL}
              likeBy={post.likeBy}
              timestamp={post.timestamp}
            />
          ))}
        </Stack>
      </Flex>
    )
  );
};

export { PostsList };
