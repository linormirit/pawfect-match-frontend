import { Flex } from "@mantine/core";
import { ThemeIcon } from "@mantine/core";
import { IconPawFilled } from "@tabler/icons-react";

const PostFooter: React.FC = () => {
  return (
    <Flex>
      <ThemeIcon variant="white" size={64} color={"dark"}>
        <IconPawFilled
          style={{ height: "70%", width: "70%" }}
          stroke={1.5}
          cursor={"pointer"}
        />
      </ThemeIcon>
    </Flex>
  );
};

export { PostFooter };
