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

import {
  newPostText,
  postButtonText,
  addPostPlaceholder,
  breedAutocompleteLabel,
  autoCompletePlaceholder,
} from "../../strings";
import { BreedList } from "../../types/dog";
import { dogApi } from "../../services/dog-service";

const AddPost: React.FC = () => {
  const [postImage, setPostImage] = useState<File>();
  const {
    data: breedList,
    error,
    loading,
  } = useFetch<BreedList>(dogApi.getBreedsList);

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
      postImage: "",
      breed: "",
    },
  });

  const handeImageReset = () => {
    setPostImage(undefined);
  };

  return (
    <Center>
      <Card
        shadow={"sm"}
        padding={"lg"}
        radius={"md"}
        w={"60%"}
        h={320}
        mt={"xl"}
        withBorder
      >
        <Stack gap={"lg"}>
          <Flex align={"center"} justify={"space-between"} ml={"40%"}>
            <Title>{newPostText}</Title>
            <Button variant={"transparent"} size={"xl"} p={0}>
              {postButtonText}
            </Button>
          </Flex>
          <Flex
            align={"flex-start"}
            justify={"space-between"}
            mt={"sm"}
            h={100}
          >
            <Flex align={"center"} gap={"xs"}>
              <Avatar radius={"xl"} size={60} src={""} />
              <Textarea
                w={400}
                key={form.key("content")}
                {...form.getInputProps("content")}
                placeholder={addPostPlaceholder}
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
                <Button variant={"outline"} p={"xs"} onClick={handeImageReset}>
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
          />
        </Stack>
      </Card>
    </Center>
  );
};

export { AddPost };
