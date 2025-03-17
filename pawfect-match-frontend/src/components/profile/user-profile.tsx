import { useMemo } from "react";
import { isNil, sumBy } from "lodash";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";

import {
  postsText,
  likesText,
  engagementRateText,
  editProfileButtonText,
} from "../../strings";
import { User } from "../../types/user";
import { serverBaseUrl } from "../../consts";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { PostsList } from "../posts/posts-list";

const UserProfile: React.FC<{ posts: PostType[]; users: User[] }> = ({
  posts,
  users,
}) => {
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

  const numEngagement = useMemo(() => {
    return numUserLikes / users.length;
  }, [numUserLikes, users.length]);

  return (
    !isNil(loggedUser) &&
    !isNil(userPosts) && (
      <Stack mt={"xl"} gap={"4vh"} align={'flex-start'}>
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
        <PostsList posts={userPosts} />
      </Stack>
    )
  );
};

export { UserProfile };
