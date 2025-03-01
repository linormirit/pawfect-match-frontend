import { Center } from "@mantine/core";

import { Post } from "./post";
import { Post as PostType } from "../../types/post";
import { fetchPosts } from "../../services/post-service";

const PostsList: React.FC = () => {
  const posts: PostType[] = fetchPosts();

  return (
    <Center>
      {posts.map((post) => (
        <Post
          id={post.id}
          userId={post.userId}
          content={post.content}
          breed={post.breed}
          imageUrl={post.imageUrl}
          lastUpdated={post.lastUpdated}
        />
      ))}
    </Center>
  );
};

export { PostsList };
