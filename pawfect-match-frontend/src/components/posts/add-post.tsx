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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addPostPlaceholder } from "../../strings";

const AddPost: React.FC = () => {
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
        mt={"xl"}
        withBorder
      >
        <Stack gap={'sm'}>
        <Button variant={"transparent"} ml={'80%'} size={'xl'}>Post</Button>
        <Flex justify={'center'}><Title>New Post</Title></Flex>
          <Flex align={"center"} justify={"space-evenly"}>
            <Flex gap={"sm"}>
              <Avatar radius={"xl"} size={60} src={""} />
              <Textarea
                key={form.key("content")}
                {...form.getInputProps("content")}
                placeholder={addPostPlaceholder}
              />
            </Flex>
            <FileInput />
          </Flex>
        </Stack>
      </Card>
    </Center>
  );
};

export { AddPost };
