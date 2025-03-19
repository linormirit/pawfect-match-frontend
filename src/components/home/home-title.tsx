import { Title } from "@mantine/core";

import { pawGreen } from "../../consts";
import { homePageTitle } from "../../strings";

const HomeTitle: React.FC<{ fontSize: number }> = ({ fontSize }) => {
  return (
    <Title
      style={{
        color: "#ffffff",
        fontSize: `${fontSize}px`,
        fontWeight: "bold",
        padding: "10px 20px",
        display: "inline-block",
        textShadow: `
        -4px -4px 0px ${pawGreen}, 
        4px -4px 0px ${pawGreen}, 
        -4px 4px 0px ${pawGreen}, 
        4px 4px 0px ${pawGreen}
        `,
      }}
    >
      {homePageTitle}
    </Title>
  );
};

export { HomeTitle };
