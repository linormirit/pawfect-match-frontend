import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { Button, Card, Group, Stack, TextInput } from "@mantine/core";

import { pawGreen } from "../../consts";
import { loginText, signUpText } from "../../strings";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(form.errors);
    console.log(values);
    navigate("/overview");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            placeholder="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
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
