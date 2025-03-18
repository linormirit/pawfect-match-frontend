import { isEmpty, isNil } from "lodash";
import { Flex, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { User } from "../../types/user";
import { fetchUserById } from "../../services/user-service";
import { Comment as CommentType } from "../../types/comment";
import { useUser } from "../../contexts/user-context";

const Comment: React.FC<Pick<CommentType, "content" | "userId">> = ({
  content,
  userId,
}) => {
  const { token } = useUser();
  const { data: commentUser } = useQuery<User, Error>({
    queryKey: ["fetchCommentUserById", userId],
    queryFn: () => fetchUserById(userId, token),
    enabled: !isEmpty(userId) && !isEmpty(token),
  });

  return (
    !isNil(commentUser) && (
      <Flex gap={"sm"}>
        <Text style={{ fontWeight: "bold" }}>{commentUser.username}</Text>
        <Text style={{ overflowWrap: "break-word" }}>{content}</Text>
      </Flex>
    )
  );
};

export { Comment };
