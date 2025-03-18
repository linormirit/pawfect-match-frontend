import { Flex, Image } from "@mantine/core";
import { HomeTitle } from "./home-title";

const Logo: React.FC<{ fontSize: number; imageSize: number }> = ({
  fontSize,
  imageSize,
}) => {
  return (
    <Flex gap={"xs"} align={"center"} miw={480}>
      <HomeTitle fontSize={fontSize} />
      <Image
        h={imageSize}
        src={"/home-paw.png"}
        style={{ transform: "rotate(15deg)" }}
      ></Image>
    </Flex>
  );
};

export { Logo };
