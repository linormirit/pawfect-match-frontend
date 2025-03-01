import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setPosts(fetchPosts());
  }, []);

  return (
    <Stack justify={"center"} align={"center"}>
      {posts.map((post) => (
        <Post
          id={post.id}
          userId={post.userId}
          content={post.content}
          breed={post.breed}
          imageUrl={post.imageUrl}
          likedBy={post.likedBy}
          lastUpdated={post.lastUpdated}
        />
      ))}
    </Stack>
  );
};

export { PostsList };
