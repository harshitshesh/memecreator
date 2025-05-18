// User types
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: string;
  stats: {
    totalMemes: number;
    totalUpvotes: number;
    totalViews: number;
  };
  badges: string[];
}

// Meme types
export interface Meme {
  id: string;
  templateId: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
  creatorId: string;
  creatorUsername: string;
  createdAt: string;
  stats: {
    views: number;
    upvotes: number;
    downvotes: number;
    comments: number;
  };
  tags: string[];
}

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

// Comment types
export interface Comment {
  id: string;
  memeId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export type FeedFilter = 'new' | 'top24h' | 'topWeek' | 'allTime';