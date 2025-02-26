import { Post } from "./post";
import { Post as PostType } from "../../types/post";

const PostsList: React.FC<PostType[]> = (posts) => {
  return posts.map((post) => (
    <Post
      id={post.id}
      userId={post.userId}
      content={post.content}
      animalId={post.animalId}
      imageUrl={post.imageUrl}
      lastUpdated={post.lastUpdated}
    />
  ));
};

export { PostsList };
