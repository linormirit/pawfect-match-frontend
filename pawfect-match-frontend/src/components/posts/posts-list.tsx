import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Flex, Stack, Title, Text } from "@mantine/core";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { newFeatureSubText, newFeatureText } from "../../strings";
import { fetchPosts } from "../../services/post-service";
import { useUser } from "../../contexts/user-context";

const PostsList: React.FC = () => {
  const { token } = useUser();

  const { data: posts } = useQuery<PostType[], Error>({
    queryKey: ["fetchPosts"],
    queryFn: () => fetchPosts(token),
    enabled: !isNil(token),
  });

  console.log(posts);

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
              likedBy={post.likedBy}
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
