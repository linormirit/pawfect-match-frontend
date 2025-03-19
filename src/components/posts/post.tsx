import {
  useQuery,
  useMutation,
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { isEmpty, isNil } from "lodash";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Card, Image, Menu, Modal } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";

import { EditPost } from "./edit-post";
import { User } from "../../types/user";
import { PostFooter } from "./post-footer";
import { PostHeader } from "./post-header";
import { Post as PostType } from "../../types/post";
import { pawGray, serverBaseUrl } from "../../consts";
import { useUser } from "../../contexts/user-context";
import { deletePost } from "../../services/post-service";
import { fetchUserById } from "../../services/user-service";

const Post: React.FC<
  PostType & {
    postSize: number;
    view: "profile" | "feed";
    refetchPosts: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<PostType[], Error>>;
  }
> = ({
  _id,
  userId,
  imageURL,
  content,
  likeBy,
  postSize,
  view,
  refetchPosts,
}) => {
  const { token, loggedUser } = useUser();
  const [editPostOpened, { open, close }] = useDisclosure(false);

  const { data: postUser, refetch: refetchPostUser } = useQuery<User, Error>({
    queryKey: ["fetchPostUserById", userId],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  const { mutate: mutateDeletePost } = useMutation<
    PostType,
    Error,
    { token: string; postId: string }
  >({
    mutationFn: deletePost,
    onSuccess: () => {
      refetchPosts();
    },
  });

  useEffect(() => {
    if (loggedUser?._id === postUser?._id) {
      refetchPostUser();
    }
  }, [loggedUser, postUser, refetchPostUser]);

  return (
    !isNil(postUser) &&
    !isNil(loggedUser) && (
      <Card
        w={postSize}
        h={postSize}
        shadow={"sm"}
        padding={view === "feed" ? "lg" : 0}
        radius={"md"}
        style={{
          position: "relative",
        }}
        withBorder
      >
        {view === "profile" && (
          <Menu shadow={"md"}>
            <Menu.Target>
              <ActionIcon
                size={"lg"}
                variant={"transparent"}
                style={{
                  top: 0,
                  right: 0,
                  position: "absolute",
                }}
              >
                <IconDotsVertical color={pawGray} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit size="1rem" />} onClick={open}>
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size="1rem" />}
                color={"red"}
                onClick={() => mutateDeletePost({ token, postId: _id })}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
        <Modal opened={editPostOpened} onClose={close} size={800}>
          <EditPost
            postId={_id}
            content={content}
            close={close}
            refetchPosts={refetchPosts}
          />
        </Modal>
        <Card.Section>
          {view === "feed" && (
            <PostHeader
              username={postUser.username}
              avatarURL={postUser.avatarURL}
            ></PostHeader>
          )}
        </Card.Section>
        <Card.Section>
          <Image src={`${serverBaseUrl}${imageURL}`} height={320} />
        </Card.Section>
        <Card.Section>
          {view === "feed" && (
            <PostFooter
              _id={_id}
              likeBy={likeBy}
              content={content}
              loggedUserId={loggedUser._id}
              postUsername={postUser.username}
            />
          )}
        </Card.Section>
      </Card>
    )
  );
};

export { Post };
