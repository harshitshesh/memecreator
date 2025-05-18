import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp as Trending, UserCircle, Star, Tag, Award } from 'lucide-react';
import { useMemes } from '../../contexts/MemeContext';

const Sidebar: React.FC = () => {
  const { getTrendingTags, getTopCreators, getMemeOfTheDay } = useMemes();

  return (
    <div className="h-screen p-4 overflow-hidden"> {/* Fixed height, no scroll */}
      <div className="space-y-6">
        {/* Main Navigation */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h2>
          <nav className="space-y-1">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-white rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Link>
            <Link
              to="/trending"
              className="flex items-center px-3 py-2 text-white rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              <Trending className="mr-3 h-5 w-5" />
              Trending
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-white rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              <UserCircle className="mr-3 h-5 w-5" />
              My Profile
            </Link>
          </nav>
        </div>

        {/* Trending Tags */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            Trending Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {getTrendingTags().map(tag => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-purple-200 hover:text-purple-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Top Creators
          </h2>
          <div className="space-y-3">
            {getTopCreators().map((creator, index) => (
              <div key={creator.userId} className="flex items-center">
                <span className="text-white w-6 text-center font-semibold">{index + 1}</span>
                <span className="text-white font-medium">{creator.username}</span>
                <span className="ml-auto text-purple-500 font-semibold">{creator.totalUpvotes} ⬆️</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meme of the Day */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Meme of the Day
          </h2>
          {getMemeOfTheDay() ? (
            <Link
              to={`/meme/${getMemeOfTheDay()?.id}`}
              className="block rounded-md overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img
                src={getMemeOfTheDay()?.imageUrl}
                alt="Meme of the day"
                className="w-full h-32 object-cover"
              />
              <div className="text-xs mt-1 text-gray-600">
                by {getMemeOfTheDay()?.creatorUsername}
              </div>
            </Link>
          ) : (
            <div className="text-gray-500 text-sm">No meme today yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
