import {
  Button,
  Card,
  FileInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  signUpText,
  chooseAvatarText,
  invalidPasswordText,
  passwordNotConfirmdText,
} from "../../strings";
import { User } from "../../types/user";
import { useUser } from "../../contexts/user-context";
import { register } from "../../services/user-service";
import { uploadFile } from "../../services/file-service";
import { TokenResponse } from "../../types/token-response";

const SignUpForm: React.FC = () => {
  const [avatarImage, setAvaterImage] = useState<File | null>(null);
  const { login } = useUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        /^[a-zA-Z0-9._-]{3,20}$/.test(value) ? null : "Invalid username",
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : invalidPasswordText,
    },
  });

  const { mutate: mutateRegister } = useMutation<
    TokenResponse,
    Error,
    Pick<User, "email" | "username" | "password" | "avatarURL">
  >({
    mutationFn: register,
    onSuccess: () => {
      if (login) {
        login(form.getValues().email, form.getValues().password);
      }
    },
  });

  const { mutate: mutateUploadFile } = useMutation<
    { url: string },
    Error,
    { file: File | null }
  >({
    mutationFn: uploadFile,
    onSuccess: ({ url }) => {
      mutateRegister({
        email: form.getValues().email,
        username: form.getValues().username,
        avatarURL: url,
        password: form.getValues().password,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.getValues().password !== form.getValues().confirmPassword) {
      form.setErrors({ confirmPassword: passwordNotConfirmdText });
    } else {
      mutateUploadFile({ file: avatarImage });
    }
  };

  return (
    <Stack align={"center"} justify={"center"} mt={100}>
      <Title>{signUpText}</Title>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label={"Email"}
              placeholder={"your@email.com"}
              key={form.key("email")}
              {...form.getInputProps("email")}
              error={form.errors.email}
            />
            <TextInput
              label={"Username"}
              placeholder={"user_name"}
              key={form.key("username")}
              {...form.getInputProps("username")}
              error={form.errors.username}
            />
            <FileInput
              label={"Avatar"}
              placeholder={chooseAvatarText}
              onChange={(file) => {
                if (file) {
                  setAvaterImage(file);
                }
              }}
            />
            <TextInput
              label={"Password"}
              placeholder={"password"}
              key={form.key("password")}
              {...form.getInputProps("password")}
              error={form.errors.password}
            />
            <TextInput
              label={"Confirm password"}
              placeholder={"confirm password"}
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
            <Button type="submit">{signUpText}</Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
};

export { SignUpForm };
