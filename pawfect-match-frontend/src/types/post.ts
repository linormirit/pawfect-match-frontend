interface Post {
    id: string;
    userId: string;
    breed: string;
    content: string;
    imageUrl: string;
    likedBy: string[];
    timestamp: Date;
}

export type { Post };
