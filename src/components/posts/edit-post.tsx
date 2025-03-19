import {
  Image,
  Button,
  Card,
  FileInput,
  Flex,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useMutation,
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { isNil } from "lodash";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";

import { serverBaseUrl } from "../../consts";
import { Post as PostType } from "../../types/post";
import { useUser } from "../../contexts/user-context";
import { uploadFile } from "../../services/file-service";
import { updatePost } from "../../services/post-service";

const EditPost: React.FC<{
  postId: string;
  content: string;
  close: () => void;
  refetchPosts: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PostType[], Error>>;
}> = ({ postId, content, close, refetchPosts }) => {
  const { token } = useUser();
  const { loggedUser } = useUser();
  const [postImage, setPostImage] = useState<File | null>(null);

  const postUrl = useMemo(() => {
    if (postImage) {
      return URL.createObjectURL(postImage);
    } else {
      return !isNil(loggedUser)
        ? `${serverBaseUrl}${loggedUser?.avatarURL}`
        : "";
    }
  }, [loggedUser, postImage]);

  const handeImageReset = () => {
    setPostImage(null);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: content,
    },
    validate: {
      content: (value) => (value?.trim() ? null : "content is required"),
    },
  });

  const { mutate: mutateUpdatePost, isPending } = useMutation<
    PostType,
    Error,
    { token: string; post: Pick<PostType, "_id" | "content" | "imageURL"> }
  >({
    mutationFn: updatePost,
    onSuccess: () => {
      refetchPosts();
      close();
    },
  });

  const { mutate: mutateUploadFile } = useMutation<
    { url: string },
    Error,
    { file: File | null }
  >({
    mutationFn: uploadFile,
    onSuccess: ({ url }) => {
      mutateUpdatePost({
        token,
        post: {
          _id: postId,
          content: form.getValues().content,
          imageURL: url,
        },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutateUploadFile({ file: postImage });
  };

  return (
    <Stack p={"xl"}>
      <form onSubmit={handleSubmit}>
        <Stack justify={"center"} align={"center"} gap={2}>
          <Card>
            <Image radius={"xl"} src={postUrl} />
          </Card>
          {isNil(postImage) ? (
            <FileInput
              size={"lg"}
              variant={"unstyled"}
              placeholder={"Edit image"}
              value={postImage}
              accept={"image/*"}
              onChange={(file) => {
                if (file) {
                  setPostImage(file);
                }
              }}
            />
          ) : (
            <Button
              p={"xs"}
              size={"sm"}
              variant={"outline"}
              onClick={handeImageReset}
            >
              <Text size={"sm"}>Remove Photo</Text>
            </Button>
          )}
        </Stack>
        <Flex gap={12} align={"center"}>
          <Text>Content</Text>
          <TextInput
            w={200}
            key={form.key("content")}
            {...form.getInputProps("content")}
          />
        </Flex>
        <Flex justify={"center"} mt={"xl"}>
          {!isPending ? (
            <Button type={"submit"} variant={"outline"}>
              Save changes
            </Button>
          ) : (
            <Loader />
          )}
        </Flex>
      </form>
    </Stack>
  );
};

export { EditPost };
