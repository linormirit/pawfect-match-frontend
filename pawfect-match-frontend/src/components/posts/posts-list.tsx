import { isNil } from "lodash";
import { Flex, Stack, Title, Text } from "@mantine/core";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { newFeatureSubText, newFeatureText } from "../../strings";

const PostsList: React.FC<{ posts: PostType[] | undefined }> = ({ posts }) => {
  return (
    !isNil(posts) && (
      <Flex mt={"xl"}>
        <Stack justify={"center"} align={"center"} mx={"10%"}>
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
        <Stack w={"32vw"}>
          <Title>{newFeatureText}</Title>
          <Text size={"xl"}>{newFeatureSubText}</Text>
        </Stack>
      </Flex>
    )
  );
};

export { PostsList };
