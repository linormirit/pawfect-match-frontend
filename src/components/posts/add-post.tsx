import {
  Card,
  Flex,
  Text,
  Stack,
  Image,
  Button,
  Loader,
  Avatar,
  Textarea,
  FileInput,
  Autocomplete,
} from "@mantine/core";
import { flatMap, isNil } from "lodash";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { useMutation, QueryObserverResult } from "@tanstack/react-query";

import {
  newPostText,
  postButtonText,
  addPostPlaceholder,
  breedAutocompleteLabel,
  autoCompletePlaceholder,
} from "../../strings";
import { Post } from "../../types/post";
import { BreedList } from "../../types/dog";
import { useUser } from "../../contexts/user-context";
import { uploadFile } from "../../services/file-service";
import { createPost } from "../../services/post-service";

const AddPost: React.FC<{
  breedList: BreedList | null;
  breedListError: Error | null;
  breedListLoading: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  refetchPosts: () => Promise<QueryObserverResult<Post[], Error>>;
}> = ({
  setActiveTab,
  refetchPosts,
  breedList,
  breedListError,
  breedListLoading,
}) => {
  const [postImage, setPostImage] = useState<File | null>(null);
  const { token, loggedUser } = useUser();

  const { mutate: mutateCreatePost } = useMutation<
    Post,
    Error,
    { token: string; post: Pick<Post, "content" | "breed" | "imageURL"> }
  >({
    mutationFn: createPost,
    onSuccess: () => {
      refetchPosts();
      setActiveTab("overview");
    },
  });

  const { mutate: mutateUploadFile } = useMutation<
    { url: string },
    Error,
    { file: File | null }
  >({
    mutationFn: uploadFile,
    onSuccess: ({ url }) => {
      mutateCreatePost({
        token,
        post: {
          content: form.getValues().content,
          breed: form.getValues().breed,
          imageURL: url,
        },
      });
    },
  });

  const breeds: string[] = useMemo(() => {
    if (!breedListLoading) {
      if (!breedListError) {
        return flatMap(breedList?.message, (subBreeds, breed) => {
          return subBreeds.map((subBreed) => `${subBreed} ${breed}`);
        });
      } else {
        return [breedListError.message];
      }
    } else {
      return [];
    }
  }, [breedList, breedListLoading, breedListError]);

  const imageUrl = useMemo(() => {
    if (postImage) {
      return URL.createObjectURL(postImage);
    }
  }, [postImage]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      breed: "",
    },
    validate: {
      breed: (value) => (value.trim() ? null : "breed is required"),
    },
  });

  const handeImageReset = () => {
    setPostImage(null);
  };

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutateUploadFile({ file: postImage });
  };

  return (
    <Card
      w={800}
      shadow={"sm"}
      radius={"md"}
      mt={"xl"}
      p={"xl"}
      ml={"12vw"}
      withBorder
    >
      <Stack gap={"lg"}>
        <form onSubmit={handlePostSubmit}>
          <Flex align={"center"} justify={"space-between"} ml={"46%"}>
            <Text size={"22px"} style={{ fontWeight: "bold" }}>
              {newPostText}
            </Text>
            <Button variant={"transparent"} p={0} type={"submit"}>
              <Text size={"xl"} style={{ fontWeight: "bold" }}>
                {postButtonText}
              </Text>
            </Button>
          </Flex>
          <Flex h={100} gap={"lg"} mt={"sm"} align={"flex-start"}>
            <Flex align={"center"} gap={"xs"}>
              <Avatar radius={"xl"} size={60} src={loggedUser?.avatarURL} />
              <Textarea
                w={340}
                key={form.key("content")}
                placeholder={addPostPlaceholder}
                {...form.getInputProps("content")}
              />
              {isNil(imageUrl) ? (
                <FileInput
                  placeholder={"Select Photo"}
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
            </Flex>
            <Image src={imageUrl} radius={"sm"} maw={160} mah={180} />
          </Flex>
          <Autocomplete
            w={300}
            label={breedAutocompleteLabel}
            placeholder={autoCompletePlaceholder}
            data={breeds}
            rightSection={breedListLoading ? <Loader size={"sm"} /> : null}
            {...form.getInputProps("breed")}
          />
        </form>
      </Stack>
    </Card>
  );
};

export { AddPost };
