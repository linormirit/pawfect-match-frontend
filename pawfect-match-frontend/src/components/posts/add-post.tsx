import {
  Card,
  Flex,
  Stack,
  Title,
  Center,
  Button,
  Avatar,
  Textarea,
  FileInput,
  Autocomplete,
} from "@mantine/core";
import {
  newPostText,
  postButtonText,
  addPostPlaceholder,
  breedAutocompleteLabel,
  autoCompletePlaceholder,
} from "../../strings";
import { useState } from "react";
import { useForm } from "@mantine/form";

const AddPost: React.FC = () => {
  const [postImage, setPostImage] = useState<File>();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      postImage: "",
      breed: "",
    },
  });
  return (
    <Center>
      <Card
        shadow={"sm"}
        padding={"lg"}
        radius={"md"}
        w={"60%"}
        h={400}
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
          <Flex align={"center"} gap={"sm"}>
            <Flex gap={"sm"}>
              <Avatar radius={"xl"} size={60} src={""} />
              <Textarea
                w={400}
                key={form.key("content")}
                {...form.getInputProps("content")}
                placeholder={addPostPlaceholder}
              />
            </Flex>
            <FileInput
              placeholder={"Add post"}
              value={postImage}
              onChange={(file) => {
                if (file) {
                  setPostImage(file);
                }
              }}
            />
          </Flex>
          <Autocomplete
            w={300}
            label={breedAutocompleteLabel}
            placeholder={autoCompletePlaceholder}
            data={["Corgi", "Husky"]}
          />
        </Stack>
      </Card>
    </Center>
  );
};

export { AddPost };
