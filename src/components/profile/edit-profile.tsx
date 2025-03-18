import { isNil } from "lodash";
import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { serverBaseUrl } from "../../consts";
import { useUser } from "../../contexts/user-context";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../services/file-service";
import { User } from "../../types/user";
import { updateUserById } from "../../services/user-service";

const EditProfile: React.FC<{ close: () => void }> = ({ close }) => {
  const { token } = useUser();
  const { loggedUser } = useUser();
  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const avatarUrl = useMemo(() => {
    if (avatarImage) {
      return URL.createObjectURL(avatarImage);
    } else {
      return !isNil(loggedUser)
        ? `${serverBaseUrl}${loggedUser?.avatarURL}`
        : "";
    }
  }, [loggedUser, avatarImage]);

  const handeImageReset = () => {
    setAvatarImage(null);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: loggedUser?.username,
    },
    validate: {
      username: (value) => (value?.trim() ? null : "username is required"),
    },
  });

  const { mutate: mutateUpdateUser } = useMutation<
    User,
    Error,
    { token: string; user: Pick<User, "_id" | "avatarURL" | "username"> }
  >({
    mutationFn: updateUserById,
    onSuccess: () => {},
  });

  const { mutate: mutateUploadFile } = useMutation<
    { url: string },
    Error,
    { file: File | null }
  >({
    mutationFn: uploadFile,
    onSuccess: ({ url }) => {
      if (!isNil(loggedUser)) {
        mutateUpdateUser({
          token,
          user: {
            _id: loggedUser?._id,
            avatarURL: url,
            username: form.getValues().username ?? "",
          },
        });
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutateUploadFile({ file: avatarImage });
    close();
  };

  return (
    <Stack p={"xl"}>
      <form onSubmit={handleSubmit}>
        <Stack justify={"center"} align={"center"}>
          <Avatar size={120} radius={"100%"} src={avatarUrl} />
          {isNil(avatarImage) ? (
            <FileInput
              size={"lg"}
              variant={"unstyled"}
              placeholder={"Edit avatar"}
              value={avatarImage}
              accept={"image/*"}
              onChange={(file) => {
                if (file) {
                  setAvatarImage(file);
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
          <Text>Username</Text>
          <TextInput
            w={200}
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
        </Flex>
        <Flex justify={"center"} mt={"xl"}>
          <Button type={"submit"} variant={"outline"}>
            Save changes
          </Button>
        </Flex>
      </form>
    </Stack>
  );
};

export { EditProfile };
