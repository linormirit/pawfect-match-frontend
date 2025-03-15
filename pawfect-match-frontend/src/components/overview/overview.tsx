import { Avatar, Flex, Stack, Tabs, Text, ThemeIcon } from "@mantine/core";

import { Logo } from "../home/logo";
import { menuColor } from "../../consts";
import { PostsList } from "../posts/posts-list";
import {
  IconCameraHeart,
  IconChevronLeft,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { AddPost } from "../posts/add-post";
import { useUser } from "../../contexts/user-context";

const Overview: React.FC = () => {
  const { logout } = useUser();
  return (
    <Flex>
      <ThemeIcon variant={"transparent"} size={60} onClick={logout}>
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
        defaultValue={"overview"}
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
              <Text style={{ fontWeight: "bold" }}>Logged user</Text>
            </Tabs.Tab>
            <Tabs.Tab
              value={"addPost"}
              leftSection={<IconSquareRoundedPlus size={40} />}
            >
              <Text style={{ fontWeight: "bold" }}>Add Post</Text>
            </Tabs.Tab>
          </Tabs.List>
        </Stack>

        <Tabs.Panel value={"overview"}>
          <PostsList />
        </Tabs.Panel>
        <Tabs.Panel value={"profile"}>Messages tab content</Tabs.Panel>
        <Tabs.Panel value={"addPost"}>
          <AddPost />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export { Overview };
