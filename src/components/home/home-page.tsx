import { Flex, Stack, Text } from "@mantine/core";

import { Logo } from "./logo";
import { pawGreen } from "../../consts";
import { LoginForm } from "./login-form";
import { homePageSubText, homePageText } from "../../strings";

const HomePage: React.FC = () => {
  return (
    <Flex h={"100%"} mt={240} gap={60} align={"center"} justify={"center"}>
      <Flex h={"100%"}>
        <LoginForm />
      </Flex>
      <Stack h={"100%"}>
        <Logo fontSize={100} imageSize={120} />
        <Text size={"30px"} style={{ color: pawGreen }}>
          {homePageText}
        </Text>
        <Text size={"30px"} style={{ color: pawGreen }}>
          {homePageSubText}
        </Text>
      </Stack>
    </Flex>
  );
};

export { HomePage };
