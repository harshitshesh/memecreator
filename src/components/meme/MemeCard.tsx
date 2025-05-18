import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, Share2 } from 'lucide-react';
import { Meme } from '../../types';
import { useMemes } from '../../contexts/MemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  const { isAuthenticated } = useAuth();
  const { voteMeme } = useMemes();
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  
  // Format the date to a user-friendly string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const handleVote = (value: 1 | -1) => {
    if (!isAuthenticated) {
      // Redirect to login in a real app
      alert('Please log in to vote!');
      return;
    }
    
    voteMeme(meme.id, value);
    setVoted(value === 1 ? 'up' : 'down');
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(`${window.location.origin}/meme/${meme.id}`);
    alert('Link copied to clipboard!');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/meme/${meme.id}`} className="block">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden bg-gray-200 relative">
            <img
              src={meme.imageUrl}
              alt={`Meme by ${meme.creatorUsername}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {meme.topText && (
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {meme.topText}
                  </h3>
                </div>
              )}
              {meme.bottomText && (
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {meme.bottomText}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Link to={`/user/${meme.creatorId}`} className="text-sm font-medium text-gray-700 hover:text-purple-600">
            @{meme.creatorUsername}
          </Link>
          <span className="text-xs text-gray-500">{formatDate(meme.createdAt)}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {meme.tags.map(tag => (
            <Link
              key={tag}
              to={`/tag/${tag}`}
              className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full hover:bg-purple-100"
            >
              #{tag}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center space-x-1 ${
                voted === 'up' ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
              }`}
              onClick={() => handleVote(1)}
              disabled={voted !== null}
            >
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">{meme.stats.upvotes}</span>
            </button>
            
            <button
              className={`flex items-center space-x-1 ${
                voted === 'down' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
              onClick={() => handleVote(-1)}
              disabled={voted !== null}
            >
              <ThumbsDown className="h-4 w-4" />
              <span className="text-xs font-medium">{meme.stats.downvotes}</span>
            </button>
            
            <Link
              to={`/meme/${meme.id}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{meme.stats.comments}</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">{meme.stats.views}</span>
            </div>
            
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-purple-600"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;