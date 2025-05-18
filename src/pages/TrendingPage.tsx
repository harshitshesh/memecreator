import React, { useState } from 'react';
import { useMemes } from '../contexts/MemeContext';
import MemeCard from '../components/meme/MemeCard';
import { TrendingUp as Trending, Trophy, Award, Siren as Fire } from 'lucide-react';

const TrendingPage: React.FC = () => {
  const { getMemesForFeed, getMemeOfTheDay, getTopCreators } = useMemes();
  const [activeSection, setActiveSection] = useState<'top' | 'creators' | 'ofTheDay'>('top');
  
  const topMemes = getMemesForFeed('top24h').slice(0, 12);
  const memeOfTheDay = getMemeOfTheDay();
  const topCreators = getTopCreators();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <Trending className="h-8 w-8 mr-2 text-purple-600" />
          Trending on MemeHub
        </h1>
        <p className="text-gray-600">
          Discover what's hot right now in the meme universe
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'top'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('top')}
          >
            Top Memes
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'ofTheDay'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('ofTheDay')}
          >
            Meme of the Day
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeSection === 'creators'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveSection('creators')}
          >
            Top Creators
          </button>
        </div>
      </div>
      
      {activeSection === 'top' && (
        <div>
          <div className="flex items-center mb-6">
            <Fire className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-bold">Top Memes Today</h2>
          </div>
          
          {topMemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topMemes.map(meme => (
                <MemeCard key={meme.id} meme={meme} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No trending memes yet</h3>
              <p className="text-gray-500">
                Check back later or create your own meme to get it trending!
              </p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === 'ofTheDay' && (
        <div>
          <div className="flex items-center mb-6">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-bold">Meme of the Day</h2>
          </div>
          
          {memeOfTheDay ? (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-md">
              <div className="bg-white rounded-lg overflow-hidden mb-6">
                <div className="p-4 bg-yellow-50 border-b border-yellow-100 flex items-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="font-bold text-yellow-800">Today's Winner</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt={memeOfTheDay.creatorUsername}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium">@{memeOfTheDay.creatorUsername}</h3>
                      <div className="text-green-600 text-sm font-medium">
                        +{memeOfTheDay.stats.upvotes - memeOfTheDay.stats.downvotes} net votes
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
                      <img
                        src={memeOfTheDay.imageUrl}
                        alt={`Meme by ${memeOfTheDay.creatorUsername}`}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        {memeOfTheDay.topText && (
                          <div className="text-center">
                            <h3 className="text-white text-2xl md:text-3xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                              {memeOfTheDay.topText}
                            </h3>
                          </div>
                        )}
                        {memeOfTheDay.bottomText && (
                          <div className="text-center">
                            <h3 className="text-white text-2xl md:text-3xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                              {memeOfTheDay.bottomText}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {memeOfTheDay.tags.map(tag => (
                      <a
                        key={tag}
                        href={`/tag/${tag}`}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full hover:bg-purple-100"
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-purple-600">{memeOfTheDay.stats.views}</div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">{memeOfTheDay.stats.upvotes}</div>
                        <div className="text-xs text-gray-500">Upvotes</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-600">{memeOfTheDay.stats.comments}</div>
                        <div className="text-xs text-gray-500">Comments</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href={`/meme/${memeOfTheDay.id}`}
                  className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  View Full Details
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No meme of the day yet</h3>
              <p className="text-gray-500">
                Check back later to see which meme wins today!
              </p>
            </div>
          )}
        </div>
      )}
      
      {activeSection === 'creators' && (
        <div>
          <div className="flex items-center mb-6">
            <Award className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold">Leaderboard</h2>
          </div>
          
          {topCreators.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 font-semibold text-gray-600">Rank</th>
                      <th className="text-left pb-3 font-semibold text-gray-600">Creator</th>
                      <th className="text-right pb-3 font-semibold text-gray-600">Upvotes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCreators.map((creator, index) => (
                      <tr key={creator.userId} className="border-b border-gray-100 last:border-0">
                        <td className="py-4">
                          <div className="flex items-center">
                            {index === 0 ? (
                              <span className="w-8 h-8 flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full font-bold">
                                1
                              </span>
                            ) : index === 1 ? (
                              <span className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full font-bold">
                                2
                              </span>
                            ) : index === 2 ? (
                              <span className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-700 rounded-full font-bold">
                                3
                              </span>
                            ) : (
                              <span className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-700 rounded-full font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=100"
                              alt={creator.username}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <div className="font-medium">@{creator.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span className="font-bold text-green-600">{creator.totalUpvotes}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No top creators yet</h3>
              <p className="text-gray-500">
                Start creating memes to appear on the leaderboard!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;