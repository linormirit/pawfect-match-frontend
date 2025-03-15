/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Group,
  Stack,
  TextInput,
  Text,
  Loader,
} from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

import { pawGreen } from "../../consts";
import { loginText, signUpText } from "../../strings";
import { useUser } from "../../contexts/user-context";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, loading, isSuccess, loggedUser } = useUser();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (value.trim() ? null : "Email is required"),
      password: (value) => (value.trim() ? null : "Password is required"),
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    if (login) {
      login(values.email, values.password);
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (loggedUser && isSuccess) {  
      navigate("/overview");
    }
  }, [loggedUser, isSuccess]);

  return (
    <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack gap={12}>
          <TextInput
            label={"Email"}
            placeholder={"your@email.com"}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label={"Password"}
            placeholder={"password"}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          {loading ? (
            <Loader />
          ) : (
            <Text style={{ color: "red" }}>{error}</Text>
          )}
          <Button type="submit">{loginText}</Button>
          <Card.Section withBorder inheritPadding>
            <Group justify="center" mt={"sm"} mb={"sm"}>
              <Button type="button" color={pawGreen} onClick={goToSignUp}>
                {signUpText}
              </Button>
            </Group>
          </Card.Section>
        </Stack>
      </form>
    </Card>
  );
};

export { LoginForm };
