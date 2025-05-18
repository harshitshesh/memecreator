import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Eye, TrendingUp } from 'lucide-react';
import { Meme } from '../../types';

interface MemeStatsProps {
  meme: Meme;
  detailed?: boolean;
}

const MemeStats: React.FC<MemeStatsProps> = ({ meme, detailed = false }) => {
  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };
  
  // Calculate engagement rate 
  const calculateEngagementRate = (): number => {
    const interactions = meme.stats.upvotes + meme.stats.downvotes + meme.stats.comments;
    return meme.stats.views > 0 ? (interactions / meme.stats.views) * 100 : 0;
  };
  
  if (!detailed) {
    return (
      <div className="flex items-center space-x-4 text-gray-600">
        <div className="flex items-center space-x-1">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm">{formatNumber(meme.stats.upvotes)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{formatNumber(meme.stats.comments)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="h-4 w-4" />
          <span className="text-sm">{formatNumber(meme.stats.views)}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Meme Performance</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Eye className="h-6 w-6 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-gray-800">{formatNumber(meme.stats.views)}</div>
          <div className="text-xs text-gray-600">Views</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-gray-800">{formatNumber(meme.stats.upvotes)}</div>
          <div className="text-xs text-gray-600">Upvotes</div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <ThumbsDown className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold text-gray-800">{formatNumber(meme.stats.downvotes)}</div>
          <div className="text-xs text-gray-600">Downvotes</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-800">{formatNumber(meme.stats.comments)}</div>
          <div className="text-xs text-gray-600">Comments</div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-700">Net Votes</h3>
          <span className={`font-semibold ${meme.stats.upvotes - meme.stats.downvotes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {meme.stats.upvotes - meme.stats.downvotes > 0 ? '+' : ''}
            {meme.stats.upvotes - meme.stats.downvotes}
          </span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div 
            className={`absolute top-0 left-0 h-2 rounded-full ${
              meme.stats.upvotes - meme.stats.downvotes >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ 
              width: `${Math.min(100, Math.abs((meme.stats.upvotes - meme.stats.downvotes) / (meme.stats.upvotes + meme.stats.downvotes || 1) * 100))}%`,
              left: meme.stats.upvotes - meme.stats.downvotes < 0 ? 'auto' : 0,
              right: meme.stats.upvotes - meme.stats.downvotes < 0 ? 0 : 'auto'
            }}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-700 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Engagement Rate
          </h3>
          <span className="font-semibold text-blue-600">
            {calculateEngagementRate().toFixed(1)}%
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Engagement rate measures how many people interacted with your meme compared to how many viewed it.
        </p>
      </div>
    </div>
  );
};

export default MemeStats;