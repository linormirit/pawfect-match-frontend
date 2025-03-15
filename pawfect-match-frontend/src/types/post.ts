interface Post {
    _id: string;
    userId: string;
    breed: string;
    content: string;
    imageURL: string;
    likedBy: string[];
    timestamp: Date;
}

export type { Post };
