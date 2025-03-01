import { Flex, Stack, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";
import { newFeatureSubText, newFeatureText } from "../../strings";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setPosts(fetchPosts());
  }, []);

  return (
    <Flex mt={"xl"}>
      <Stack justify={"center"} align={"center"} mx={"10%"}>
        {posts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            userId={post.userId}
            content={post.content}
            breed={post.breed}
            imageUrl={post.imageUrl}
            likedBy={post.likedBy}
            lastUpdated={post.lastUpdated}
          />
        ))}
      </Stack>
      <Stack w={"32vw"}>
        <Title>{newFeatureText}</Title>
        <Text size={'xl'}>{newFeatureSubText}</Text>
      </Stack>
    </Flex>
  );
};

export { PostsList };
