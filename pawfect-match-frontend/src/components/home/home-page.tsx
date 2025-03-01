import { Flex, Image, Stack, Text } from "@mantine/core";

import { HomeTitle } from "./home-title";
import { pawGreen } from "../../consts";
import { homePageSubText, homePageText } from "../../strings";
import { LoginForm } from "./login-form";

const HomePage: React.FC = () => {
  return (
    <Flex h={"100%"} mt={240} gap={60} align={"center"} justify={"center"}>
      <Flex h={"100%"}>
        <LoginForm />
      </Flex>
      <Stack h={"100%"}>
        <Flex gap={"sm"} align={"center"}>
          <HomeTitle />
          <Image
            h={120}
            src={"/home-paw.png"}
            style={{ transform: "rotate(15deg)" }}
          ></Image>
        </Flex>
        <Text style={{ color: pawGreen, fontSize: "30px" }}>
          {homePageText}
        </Text>
        <Text style={{ color: pawGreen, fontSize: "30px" }}>
          {homePageSubText}
        </Text>
      </Stack>
    </Flex>
  );
};

export { HomePage };
