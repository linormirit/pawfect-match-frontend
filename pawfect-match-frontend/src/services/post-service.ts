import { Post } from "../types/post";

const fetchPosts = (): Post[] => {
  const posts: Post[] = [
    {
      id: "1",
      breed: "corgi",
      userId: "1",
      content: "Hi my corgi Max is looking for a new loving home!",
      imageUrl: "../src/assets/corgi.jpg",
      lastUpdated: new Date(),
    },
    {
      id: "1",
      breed: "corgi",
      userId: "1",
      content: "Hi my corgi Max is looking for a new loving home!",
      imageUrl: "../src/assets/corgi.jpg",
      lastUpdated: new Date(),
    },
    {
      id: "1",
      breed: "corgi",
      userId: "1",
      content: "Hi my corgi Max is looking for a new loving home!",
      imageUrl: "../src/assets/corgi.jpg",
      lastUpdated: new Date(),
    },
    {
      id: "1",
      breed: "corgi",
      userId: "1",
      content: "Hi my corgi Max is looking for a new loving home!",
      imageUrl: "../src/assets/corgi.jpg",
      lastUpdated: new Date(),
    },
  ];
  return posts;
};

export { fetchPosts };
