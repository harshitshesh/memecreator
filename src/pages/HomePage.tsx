import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile } from 'lucide-react';
import { useMemes } from '../contexts/MemeContext';
import { useAuth } from '../contexts/AuthContext';
import MemeCard from '../components/meme/MemeCard';
import { FeedFilter } from '../types';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { getMemesForFeed, getTrendingTags } = useMemes();
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('new');
  const navigate = useNavigate();
  
  const memes = getMemesForFeed(activeFilter);
  const trendingTags = getTrendingTags().slice(0, 5);
  
  return (
    <div>
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg shadow-xl mb-8 overflow-hidden">
          <div className="md:flex items-center">
            <div className="p-6 md:p-8 md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome to MemeHub
              </h1>
              <p className="text-purple-100 text-lg mb-6">
                Create, share, and track your memes on the internet's playground for memes.
                Join our community of meme creators and enthusiasts today!
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors"
                >
                  Sign Up Free
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                >
                  Log In
                </button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3 p-8">
              <div className="bg-white rounded-full h-52 w-52 flex items-center justify-center mx-auto">
                <Smile className="h-32 w-32 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Meme Feed</h2>
          {isAuthenticated && (
            <button
              onClick={() => navigate('/create')}
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Create Meme
            </button>
          )}
        </div>
        
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            <button
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'new'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'top24h'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('top24h')}
            >
              Top Today
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'topWeek'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('topWeek')}
            >
              Top This Week
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                activeFilter === 'allTime'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('allTime')}
            >
              All Time
            </button>
          </div>
        </div>
        
        {trendingTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-500">Trending:</span>
            {trendingTags.map(tag => (
              <a
                key={tag}
                href={`/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}
        
        {memes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map(meme => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Smile className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No memes found</h3>
            <p className="text-gray-500">
              {isAuthenticated
                ? "Be the first to create a meme in this category!"
                : "Sign up and start creating your own memes!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;