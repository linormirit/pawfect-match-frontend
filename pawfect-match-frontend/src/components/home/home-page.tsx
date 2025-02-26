import { Center, Text } from "@mantine/core";

import { homePageTitle } from "../../strings";

const HomePage: React.FC = () => {
  return (
    <Center h={'100%'} w={'100%'} mt={200}>
      <Text size={"100px"}>{homePageTitle}</Text>
    </Center>
  );
};

export { HomePage };
