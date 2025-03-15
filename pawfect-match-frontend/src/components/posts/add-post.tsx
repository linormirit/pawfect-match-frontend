import {
  Card,
  Flex,
  Text,
  Stack,
  Image,
  Title,
  Center,
  Button,
  Avatar,
  Textarea,
  FileInput,
  Autocomplete,
  Loader,
} from "@mantine/core";
import { flatMap, isNil } from "lodash";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { useFetch } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";

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
import { dogApi } from "../../services/dog-service";

const AddPost: React.FC = () => {
  const [postImage, setPostImage] = useState<File | null>(null);
  const { token } = useUser();

  const {
    data: breedList,
    error,
    loading,
  } = useFetch<BreedList>(dogApi.fetchBreedsList);

  const {
    // data: createdPost,
    // error: createPostError,
    // isPending: createPostLoading,
    mutate: mutateCreatePost,
  } = useMutation<
    Post,
    Error,
    { token: string; post: Pick<Post, "content" | "breed" | "imageUrl"> }
  >({
    mutationFn: createPost,
  });

  const {
    // data: file,
    mutate: mutateUploadFile,
  } = useMutation<{ url: string }, Error, { token: string; file: File | null }>(
    {
      mutationFn: uploadFile,
      onSuccess: ({ url }) => {
        mutateCreatePost({
          token,
          post: {
            content: form.getValues().content,
            breed: form.getValues().breed,
            imageUrl: url,
          },
        });
      },
    }
  );

  const breeds: string[] = useMemo(() => {
    if (!loading) {
      if (!error) {
        return flatMap(breedList?.message, (subBreeds, breed) => {
          return subBreeds.map((subBreed) => `${subBreed} ${breed}`);
        });
      } else {
        return [error.message];
      }
    } else {
      return [];
    }
  }, [breedList, loading, error]);

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
  });

  const handeImageReset = () => {
    setPostImage(null);
  };

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutateUploadFile({ token, file: postImage });
  };

  return (
    <Center>
      <Card
        h={320}
        w={"60%"}
        mt={"xl"}
        shadow={"sm"}
        radius={"md"}
        padding={"lg"}
        withBorder
      >
        <Stack gap={"lg"}>
          <form onSubmit={handlePostSubmit}>
            <Flex align={"center"} justify={"space-between"} ml={"40%"}>
              <Title>{newPostText}</Title>
              <Button variant={"transparent"} size={"xl"} p={0} type={"submit"}>
                {postButtonText}
              </Button>
            </Flex>
            <Flex
              h={100}
              mt={"sm"}
              align={"flex-start"}
              justify={"space-between"}
            >
              <Flex align={"center"} gap={"xs"}>
                <Avatar radius={"xl"} size={60} src={""} />
                <Textarea
                  w={400}
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
                    variant={"outline"}
                    p={"xs"}
                    onClick={handeImageReset}
                  >
                    <Text size={"sm"}>Remove Photo</Text>
                  </Button>
                )}
              </Flex>
              <Image src={imageUrl} radius={"sm"} maw={200} />
            </Flex>
            <Autocomplete
              w={300}
              label={breedAutocompleteLabel}
              placeholder={autoCompletePlaceholder}
              data={breeds}
              rightSection={loading ? <Loader size={"sm"} /> : null}
              {...form.getInputProps("breed")}
            />
          </form>
        </Stack>
      </Card>
    </Center>
  );
};

export { AddPost };
