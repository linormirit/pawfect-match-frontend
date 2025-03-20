import { useState } from "react";
import { IconBone } from "@tabler/icons-react";
import { Button, Flex, Input, Stack, Title } from "@mantine/core";

import { BreedList } from "../../types/dog";
import { getAiResult } from "../../services/dog-service";

const NewFeature: React.FC<{ breedList: BreedList | null }> = ({
  breedList,
}) => {
  const [userDescription, setUserDescripton] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>();

  const handleButtonCLick = async () => {
    const response = await getAiResult(userDescription, breedList);
    setAiResponse(response);
  };

  return (
    <Stack>
      <Input
        size={"sm"}
        value={userDescription}
        placeholder={"What pet are you looking for?"}
        onChange={(event) => setUserDescripton(event.target.value)}
      />
      <Button onClick={handleButtonCLick}>
        <Flex align={"center"} gap={2}>
          Go Fetch
          <IconBone />
        </Flex>
      </Button>
      <Title>{aiResponse}</Title>
    </Stack>
  );
};

export { NewFeature };
