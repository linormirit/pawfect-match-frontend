import {
  IconCameraHeart,
  IconChevronLeft,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { isNil } from "lodash";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Flex,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import { Logo } from "../home/logo";
import { User } from "../../types/user";
import { menuColor } from "../../consts";
import { AddPost } from "../posts/add-post";
import { PostsList } from "../posts/posts-list";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { UserProfile } from "../profile/user-profile";
import { fetchPosts } from "../../services/post-service";
import { fetchUsers } from "../../services/user-service";
import { newFeatureSubText, newFeatureText } from "../../strings";

const Overview: React.FC = () => {
  const { logout, token } = useUser();
  const [activeTab, setActiveTab] = useState<string | null>("overview");

  const { data: posts, refetch: refetchPosts } = useQuery<PostType[], Error>({
    queryKey: ["fetchPosts"],
    queryFn: () => fetchPosts(token),
    enabled: !isNil(token),
  });

  const { data: users } = useQuery<User[], Error>({
    queryKey: ["fetchUsers"],
    queryFn: () => fetchUsers(token),
    enabled: !isNil(token),
  });

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
        onChange={setActiveTab}
      >
        <Stack gap={"lg"} mt={"md"} w={"28%"}>
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
        <Flex w={"42%"} pl={"xl"} gap={"4vw"}>
          <Tabs.Panel value={"overview"}>
            {!isNil(posts) && <PostsList posts={posts} />}
          </Tabs.Panel>
          <Tabs.Panel value={"profile"}>
            {!isNil(posts) && !isNil(users) && (
              <UserProfile posts={posts} users={users} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value={"addPost"}>
            <AddPost setActiveTab={setActiveTab} refetchPosts={refetchPosts} />
          </Tabs.Panel>
        </Flex>
        <Stack w={"26%"} mt={"xl"}>
          <Title>{newFeatureText}</Title>
          <Text size={"xl"}>{newFeatureSubText}</Text>
        </Stack>
      </Tabs>
    </Flex>
  );
};

export { Overview };
