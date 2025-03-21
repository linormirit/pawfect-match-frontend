import {
  Flex,
  Tabs,
  Text,
  Stack,
  Avatar,
  Center,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCameraHeart,
  IconChevronLeft,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { isNil } from "lodash";
import { useMemo, useState } from "react";
import { useFetch } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

import { Logo } from "../home/logo";
import { menuColor } from "../../consts";
import { BreedList } from "../../types/dog";
import { AddPost } from "../posts/add-post";
import { PostsList } from "../posts/posts-list";
import { Post as PostType } from "../../types/post";
import { dogApi } from "../../services/dog-service";
import { useUser } from "../../contexts/user-context";
import { UserProfile } from "../profile/user-profile";
import { fetchPosts } from "../../services/post-service";

const Overview: React.FC = () => {
  const { logout, token, loading: isLoadingLoggedUser } = useUser();
  const [activeTab, setActiveTab] = useState<string | null>("overview");

  const {
    data: posts,
    isFetching: isLoadingPosts,
    refetch: refetchPosts,
  } = useQuery<PostType[], Error>({
    queryKey: ["fetchPosts"],
    queryFn: () => fetchPosts(token),
    enabled: !isNil(token),
  });

  const {
    data: breedList,
    error: breedListError,
    loading: breedListLoading,
  } = useFetch<BreedList>(dogApi.fetchBreedsList);

  const isLoading = useMemo(
    () => isLoadingPosts || isLoadingLoggedUser,
    [isLoadingPosts, isLoadingLoggedUser]
  );

  return (
    <Flex>
      <ThemeIcon variant={"transparent"} size={60} onClick={logout} mt={"sm"}>
        <IconChevronLeft
          stroke={1.5}
          cursor={"pointer"}
          style={{ height: "70%", width: "70%" }}
        />
      </ThemeIcon>
      <Tabs
        color={menuColor}
        variant={"pills"}
        orientation={"vertical"}
        value={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          refetchPosts();
        }}
      >
        <Stack gap={"lg"} mt={"md"}>
          <Logo fontSize={50} imageSize={70} />
          <Tabs.List p={"sm"}>
            <Tabs.Tab
              value={"overview"}
              leftSection={<IconCameraHeart size={40} />}
            >
              <Text style={{ fontWeight: "bold" }}>Posts</Text>
            </Tabs.Tab>
            <Tabs.Tab
              value={"profile"}
              leftSection={<Avatar radius={"xl"} size={40} src={""} />}
            >
              <Text style={{ fontWeight: "bold" }}>Profile</Text>
            </Tabs.Tab>
            <Tabs.Tab
              value={"addPost"}
              leftSection={<IconSquareRoundedPlus size={40} />}
            >
              <Text style={{ fontWeight: "bold" }}>Add Post</Text>
            </Tabs.Tab>
          </Tabs.List>
        </Stack>
        <Flex>
          <Tabs.Panel value={"overview"}>
            {!isNil(posts) && (
              <Center>
                <PostsList
                  posts={posts}
                  postSize={560}
                  display={"stack"}
                  isFeatureFlag={true}
                  isLoading={isLoading}
                  breedList={breedList}
                  refetchPosts={refetchPosts}
                />
              </Center>
            )}
          </Tabs.Panel>
          <Tabs.Panel value={"profile"}>
            {!isNil(posts) && (
              <UserProfile
                posts={posts}
                isLoading={isLoading}
                refetchPosts={refetchPosts}
              />
            )}
          </Tabs.Panel>
          <Tabs.Panel value={"addPost"}>
            <Center>
              <AddPost
                breedList={breedList}
                breedListError={breedListError}
                breedListLoading={breedListLoading}
                setActiveTab={setActiveTab}
                refetchPosts={refetchPosts}
              />
            </Center>
          </Tabs.Panel>
        </Flex>
      </Tabs>
    </Flex>
  );
};

export { Overview };
