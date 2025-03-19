interface Post {
    _id: string;
    userId: string;
    breed: string;
    content: string;
    imageURL: string;
    likeBy: string[];
    timestamp: Date;
}

export type { Post };
