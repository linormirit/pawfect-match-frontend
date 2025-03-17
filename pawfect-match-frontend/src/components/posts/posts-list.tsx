import {
  Text,
  Flex,
  Grid,
  Stack,
  Title,
  Loader,
  Center,
} from "@mantine/core";
import { isNil } from "lodash";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { newFeatureSubText, newFeatureText } from "../../strings";

const PostsList: React.FC<{
  postSize: number;
  posts: PostType[];
  isLoading: boolean;
  display: "grid" | "stack";
  isFeatureFlag: boolean;
}> = ({ posts, isLoading, display, isFeatureFlag, postSize }) => {
  return (
    !isNil(posts) &&
    (!isLoading ? (
      <Flex mt={"xl"} justify={"space-evenly"}>
        {display === "stack" ? (
          <Stack justify={"center"} align={"center"}>
            {posts.map((post) => (
              <Post
                _id={post._id}
                key={post._id}
                view={'feed'}
                postSize={postSize}
                userId={post.userId}
                content={post.content}
                breed={post.breed}
                imageURL={post.imageURL}
                likeBy={post.likeBy}
                timestamp={post.timestamp}
              />
            ))}
          </Stack>
        ) : (
          <Grid gutter={"xs"}>
            {posts.map((post) => (
              <Grid.Col span={4} key={post._id}>
                <Post
                  _id={post._id}
                  view={'profile'}
                  postSize={postSize}
                  userId={post.userId}
                  content={post.content}
                  breed={post.breed}
                  imageURL={post.imageURL}
                  likeBy={post.likeBy}
                  timestamp={post.timestamp}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
        {isFeatureFlag && (
          <Stack w={"26%"}>
            <Title>{newFeatureText}</Title>
            <Text size={"xl"}>{newFeatureSubText}</Text>
          </Stack>
        )}
      </Flex>
    ) : (
      <Center>
        <Loader size={"xl"} />
      </Center>
    ))
  );
};

export { PostsList };
