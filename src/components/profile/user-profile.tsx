import { useMemo } from "react";
import { floor, isNil, sumBy } from "lodash";
import { useDisclosure } from "@mantine/hooks";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Avatar, Button, Flex, Modal, Stack, Text, Title } from "@mantine/core";

import {
  postsText,
  likesText,
  engagementRateText,
  editProfileButtonText,
} from "../../strings";
import { serverBaseUrl } from "../../consts";
import { EditProfile } from "./edit-profile";
import { PostsList } from "../posts/posts-list";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";

const UserProfile: React.FC<{
  posts: PostType[];
  isLoading: boolean;
  refetchPosts: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PostType[], Error>>;
}> = ({ posts, isLoading, refetchPosts }) => {
  const { loggedUser } = useUser();
  const [editProfileOpened, { open, close }] = useDisclosure(false);

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
    return numLikes !== 0 ? floor((numUserLikes / numLikes) * 100) : 0;
  }, [numUserLikes, numLikes]);

  return (
    !isNil(loggedUser) &&
    !isNil(userPosts) && (
      <Stack mt={"xl"} ml={"xl"} gap={20} align={"flex-start"}>
        <Flex align={"start"} gap={"xl"}>
          <Avatar
            size={120}
            radius={"100%"}
            src={`${serverBaseUrl}${loggedUser.avatarURL}`}
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
          <Button variant={"outline"} w={200} onClick={open}>
            {editProfileButtonText}
          </Button>
        </Flex>
        <Modal opened={editProfileOpened} onClose={close} size={800}>
          <EditProfile close={close} />
        </Modal>
        <PostsList
          posts={userPosts}
          isLoading={isLoading}
          display={"grid"}
          isFeatureFlag={false}
          postSize={320}
          refetchPosts={refetchPosts}
        />
      </Stack>
    )
  );
};

export { UserProfile };
