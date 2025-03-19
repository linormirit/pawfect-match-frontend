import { isNil } from "lodash";
import { useMemo } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Text, Flex, Grid, Stack, Title } from "@mantine/core";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { newFeatureSubText, newFeatureText } from "../../strings";
import { NewFeature } from "../new-feature/new-feature";

const PostsList: React.FC<{
  postSize: number;
  posts: PostType[];
  isLoading: boolean;
  display: "grid" | "stack";
  isFeatureFlag: boolean;
  refetchPosts: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PostType[], Error>>;
}> = ({ posts, isLoading, display, isFeatureFlag, postSize, refetchPosts }) => {
  const colSpan = useMemo(() => (posts.length < 3 ? 6 : 4), [posts.length]);

  return (
    !isNil(posts) && (
      <Flex mt={"xl"} justify={"space-evenly"}>
        {display === "stack" ? (
          <Stack justify={"center"} align={"center"}>
            {posts.map((post) => (
              <Post
                _id={post._id}
                key={post._id}
                view={"feed"}
                postSize={postSize}
                isLoading={isLoading}
                userId={post.userId}
                content={post.content}
                breed={post.breed}
                imageURL={post.imageURL}
                likeBy={post.likeBy}
                timestamp={post.timestamp}
                refetchPosts={refetchPosts}
              />
            ))}
          </Stack>
        ) : (
          <Grid gutter={"xs"}>
            {posts.map((post) => (
              <Grid.Col span={colSpan} key={post._id}>
                <Post
                  _id={post._id}
                  view={"profile"}
                  postSize={postSize}
                  isLoading={isLoading}
                  userId={post.userId}
                  content={post.content}
                  breed={post.breed}
                  imageURL={post.imageURL}
                  likeBy={post.likeBy}
                  timestamp={post.timestamp}
                  refetchPosts={refetchPosts}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
        {isFeatureFlag && (
          <Stack w={"26%"}>
            <Title>{newFeatureText}</Title>
            <Text size={"xl"}>{newFeatureSubText}</Text>
            <NewFeature />
          </Stack>
        )}
      </Flex>
    )
  );
};

export { PostsList };
