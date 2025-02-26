import { Card, Flex, Image, Text } from "@mantine/core";

import { HomeTitle } from "./home-title";
import { pawGreen } from "../../consts";
import { homePageSubText, homePageText } from "../../strings";

const HomePage: React.FC = () => {
  return (
    <Flex h={"100%"} mt={200} align={'center'}>
      <Flex h={"100%"} w={'50%'}>
        <Card shadow="sm" padding="lg" radius="md" withBorder></Card>
      </Flex>
      <Flex direction={"column"} h={"100%"} justify={"flex-end"}>
        <Flex gap={8} align={"center"}>
          <HomeTitle />
          <Image
            h={120}
            src={"/home-paw.png"}
            style={{ transform: "rotate(15deg)" }}
          ></Image>
        </Flex>
        <Text style={{color: pawGreen, fontSize: '30px'}}>{homePageText}</Text>
        <Text style={{color: pawGreen, fontSize: '30px'}}>{homePageSubText}</Text>
      </Flex>
    </Flex>
  );
};

export { HomePage };
