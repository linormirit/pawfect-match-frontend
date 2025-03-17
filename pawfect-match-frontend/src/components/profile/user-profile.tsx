import { useMemo } from "react";
import { isNil, sumBy } from "lodash";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";

import {
  postsText,
  likesText,
  engagementRateText,
  editProfileButtonText,
} from "../../strings";
import { serverBaseUrl } from "../../consts";
import { PostsList } from "../posts/posts-list";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";

const UserProfile: React.FC<{
  posts: PostType[];
  isLoading: boolean;
}> = ({ posts, isLoading }) => {
  const { loggedUser } = useUser();

  const userPosts: PostType[] = useMemo(
    () =>
      !isNil(loggedUser)
        ? posts.filter((post) => post.userId === loggedUser._id)
        : [],
    [loggedUser, posts]
  );

  const numUserLikes: number = useMemo(
    () =>
      !isNil(loggedUser) ? sumBy(userPosts, (post) => post.likeBy.length) : 0,
    [loggedUser, userPosts]
  );

  const numLikes: number = useMemo(
    () => sumBy(posts, (post) => post.likeBy.length),
    [posts]
  );

  const numEngagement = useMemo(() => {
    return numLikes !== 0 ? numUserLikes / numLikes : 0;
  }, [numUserLikes, numLikes]);

  return (
    !isNil(loggedUser) &&
    !isNil(userPosts) && (
      <Stack mt={"xl"} gap={"4vh"} align={"flex-start"}>
        <Flex align={"start"} gap={"xl"}>
          <Avatar
            size={120}
            radius={"100%"}
            src={`${serverBaseUrl}/${loggedUser.avatarURL}`}
          />
          <Stack>
            <Title size={"xl"} mt={10}>
              {loggedUser.username}
            </Title>
            <Flex gap={"xl"}>
              <Stack gap={4}>
                <Title size={"xl"}>{userPosts.length}</Title>
                <Text>{postsText}</Text>
              </Stack>
              <Stack gap={4}>
                <Title size={"xl"}>{numUserLikes}</Title>
                <Text>{likesText}</Text>
              </Stack>
              <Stack gap={4}>
                <Title size={"xl"}>{`${numEngagement}%`}</Title>
                <Text>{engagementRateText}</Text>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
        <Flex>
          <Button variant={"outline"} w={200}>
            {editProfileButtonText}
          </Button>
        </Flex>
        <PostsList
          posts={userPosts}
          isLoading={isLoading}
          display={"grid"}
          isFeatureFlag={false}
          postSize={320}
        />
      </Stack>
    )
  );
};

export { UserProfile };
