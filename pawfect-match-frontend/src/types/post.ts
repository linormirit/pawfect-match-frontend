interface Post {
    id: string;
    userId: string;
    breed: string;
    content: string;
    imageUrl: string;
    likedBy: string[];
    lastUpdated: Date;
}

export type { Post };
