import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meme, Comment, MemeTemplate } from '../types';

interface MemeContextType {
  memes: Meme[];
  templates: MemeTemplate[];
  getMemesForFeed: (filter: 'new' | 'top24h' | 'topWeek' | 'allTime') => Meme[];
  createMeme: (memeData: Partial<Meme>) => Meme;
  getMemeById: (id: string) => Meme | undefined;
  voteMeme: (memeId: string, value: 1 | -1) => void;
  addComment: (memeId: string, text: string, userId: string) => void;
  getMemeComments: (memeId: string) => Comment[];
  getUserMemes: (userId: string) => Meme[];
  getTrendingTags: () => string[];
  getMemeOfTheDay: () => Meme | null;
  getTopCreators: () => { userId: string; username: string; totalUpvotes: number }[];
}

const MemeContext = createContext<MemeContextType | undefined>(undefined);

// Sample meme templates
const initialTemplates: MemeTemplate[] = [
  {
    id: 't1',
    name: 'Drake Hotline Bling',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    width: 1200,
    height: 1200,
  },
  {
    id: 't2',
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    width: 600,
    height: 908,
  },
  {
    id: 't3',
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: 't4',
    name: 'Running Away Balloon',
    url: 'https://i.imgflip.com/261o3j.jpg',
    width: 761,
    height: 1024,
  },
  {
    id: 't5',
    name: 'Change My Mind',
    url: 'https://i.imgflip.com/24y43o.jpg',
    width: 482,
    height: 361,
  },
  {
    id: 't6',
    name: 'Left Exit 12 Off Ramp',
    url: 'https://i.imgflip.com/22bdq6.jpg',
    width: 804,
    height: 767,
  },
];

// Sample memes for demo
const initialMemes: Meme[] = [
  {
    id: 'm1',
    templateId: 't1',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    topText: 'USING REGULAR MEME SITES',
    bottomText: 'USING MEMEHUB',
    creatorId: '1',
    creatorUsername: 'meme_lord',
    createdAt: new Date('2023-05-20T10:30:00Z').toISOString(),
    stats: {
      views: 1240,
      upvotes: 234,
      downvotes: 12,
      comments: 32,
    },
    tags: ['relatable', 'tech', 'apps'],
  },
  {
    id: 'm2',
    templateId: 't3',
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    topText: 'ME  |  NEW MEME FORMAT  |  OVERUSED MEME FORMAT',
    bottomText: '',
    creatorId: '1',
    creatorUsername: 'meme_lord',
    createdAt: new Date('2023-05-18T14:20:00Z').toISOString(),
    stats: {
      views: 3500,
      upvotes: 430,
      downvotes: 23,
      comments: 45,
    },
    tags: ['relatable', 'meta', 'humor'],
  },
  {
    id: 'm3',
    templateId: 't5',
    imageUrl: 'https://i.imgflip.com/24y43o.jpg',
    topText: '',
    bottomText: 'MEMEHUB IS THE BEST MEME PLATFORM',
    creatorId: '2',
    creatorUsername: 'dank_master',
    createdAt: new Date('2023-05-19T09:15:00Z').toISOString(),
    stats: {
      views: 2100,
      upvotes: 385,
      downvotes: 15,
      comments: 28,
    },
    tags: ['controversial', 'debate', 'opinion'],
  },
];

// Sample comments
const initialComments: Comment[] = [
  {
    id: 'c1',
    memeId: 'm1',
    userId: '2',
    username: 'dank_master',
    text: 'This is too accurate! 😂',
    createdAt: new Date('2023-05-20T11:30:00Z').toISOString(),
  },
  {
    id: 'c2',
    memeId: 'm1',
    userId: '3',
    username: 'meme_queen',
    text: 'MemHub changed my life!',
    createdAt: new Date('2023-05-20T12:15:00Z').toISOString(),
  },
  {
    id: 'c3',
    memeId: 'm2',
    userId: '2',
    username: 'dank_master',
    text: 'I feel personally attacked',
    createdAt: new Date('2023-05-18T15:10:00Z').toISOString(),
  },
];

export const MemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const [templates, setTemplates] = useState<MemeTemplate[]>(initialTemplates);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  
  // Load data from localStorage if available (in a real app, this would be API calls)
  useEffect(() => {
    const savedMemes = localStorage.getItem('memeHubMemes');
    if (savedMemes) {
      try {
        setMemes(JSON.parse(savedMemes));
      } catch (e) {
        console.error('Error loading memes', e);
      }
    }
    
    const savedComments = localStorage.getItem('memeHubComments');
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        console.error('Error loading comments', e);
      }
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('memeHubMemes', JSON.stringify(memes));
  }, [memes]);
  
  useEffect(() => {
    localStorage.setItem('memeHubComments', JSON.stringify(comments));
  }, [comments]);
  
  const createMeme = (memeData: Partial<Meme>): Meme => {
    const newMeme: Meme = {
      id: `m${Math.random().toString(36).substring(2, 9)}`,
      templateId: memeData.templateId || '',
      imageUrl: memeData.imageUrl || '',
      topText: memeData.topText || '',
      bottomText: memeData.bottomText || '',
      creatorId: memeData.creatorId || '',
      creatorUsername: memeData.creatorUsername || '',
      createdAt: new Date().toISOString(),
      stats: {
        views: 0,
        upvotes: 0,
        downvotes: 0,
        comments: 0,
      },
      tags: memeData.tags || [],
    };
    
    setMemes(prevMemes => [newMeme, ...prevMemes]);
    return newMeme;
  };
  
  const getMemesForFeed = (filter: 'new' | 'top24h' | 'topWeek' | 'allTime'): Meme[] => {
    let filteredMemes = [...memes];
    
    switch (filter) {
      case 'new':
        return filteredMemes.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
      case 'top24h':
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        return filteredMemes
          .filter(meme => new Date(meme.createdAt) >= oneDayAgo)
          .sort((a, b) => 
            (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
          );
          
      case 'topWeek':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return filteredMemes
          .filter(meme => new Date(meme.createdAt) >= oneWeekAgo)
          .sort((a, b) => 
            (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
          );
          
      case 'allTime':
        return filteredMemes.sort((a, b) => 
          (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
        );
        
      default:
        return filteredMemes;
    }
  };
  
  const getMemeById = (id: string): Meme | undefined => {
    // Increment views when a meme is accessed by ID
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id 
          ? { ...meme, stats: { ...meme.stats, views: meme.stats.views + 1 } } 
          : meme
      )
    );
    
    return memes.find(meme => meme.id === id);
  };
  
  const voteMeme = (memeId: string, value: 1 | -1) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          return {
            ...meme,
            stats: {
              ...meme.stats,
              upvotes: value === 1 ? meme.stats.upvotes + 1 : meme.stats.upvotes,
              downvotes: value === -1 ? meme.stats.downvotes + 1 : meme.stats.downvotes,
            }
          };
        }
        return meme;
      })
    );
  };
  
  const addComment = (memeId: string, text: string, userId: string) => {
    // Create new comment
    const newComment: Comment = {
      id: `c${Math.random().toString(36).substring(2, 9)}`,
      memeId,
      userId,
      username: 'current_user', // In a real app, we'd get the username from the user object
      text,
      createdAt: new Date().toISOString(),
    };
    
    // Add comment to the list
    setComments(prevComments => [newComment, ...prevComments]);
    
    // Update comment count on the meme
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === memeId 
          ? { ...meme, stats: { ...meme.stats, comments: meme.stats.comments + 1 } } 
          : meme
      )
    );
  };
  
  const getMemeComments = (memeId: string): Comment[] => {
    return comments
      .filter(comment => comment.memeId === memeId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };
  
  const getUserMemes = (userId: string): Meme[] => {
    return memes
      .filter(meme => meme.creatorId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };
  
  const getTrendingTags = (): string[] => {
    // Get all tags from all memes
    const allTags = memes.flatMap(meme => meme.tags);
    
    // Count occurrences of each tag
    const tagCounts: Record<string, number> = {};
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Sort tags by count and return top 10
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  };
  
  const getMemeOfTheDay = (): Meme | null => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    // Get memes from last 24 hours
    const recentMemes = memes.filter(meme => new Date(meme.createdAt) >= oneDayAgo);
    
    if (recentMemes.length === 0) return null;
    
    // Sort by net votes
    recentMemes.sort((a, b) => 
      (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
    );
    
    return recentMemes[0];
  };
  
  const getTopCreators = () => {
    // Group memes by creator and calculate total upvotes
    const creatorStats: Record<string, { userId: string; username: string; totalUpvotes: number }> = {};
    
    memes.forEach(meme => {
      if (!creatorStats[meme.creatorId]) {
        creatorStats[meme.creatorId] = {
          userId: meme.creatorId,
          username: meme.creatorUsername,
          totalUpvotes: 0,
        };
      }
      
      creatorStats[meme.creatorId].totalUpvotes += meme.stats.upvotes;
    });
    
    // Sort creators by total upvotes and return top 5
    return Object.values(creatorStats)
      .sort((a, b) => b.totalUpvotes - a.totalUpvotes)
      .slice(0, 5);
  };
  
  return (
    <MemeContext.Provider value={{
      memes,
      templates,
      getMemesForFeed,
      createMeme,
      getMemeById,
      voteMeme,
      addComment,
      getMemeComments,
      getUserMemes,
      getTrendingTags,
      getMemeOfTheDay,
      getTopCreators,
    }}>
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = () => {
  const context = useContext(MemeContext);
  if (context === undefined) {
    throw new Error('useMemes must be used within a MemeProvider');
  }
  return context;
};