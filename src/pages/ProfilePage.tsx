import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMemes } from '../contexts/MemeContext';
import MemeCard from '../components/meme/MemeCard';
import { Award, Image, ThumbsUp, Eye, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { getUserMemes } = useMemes();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'memes' | 'stats' | 'badges'>('memes');
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }
  
  const userMemes = user ? getUserMemes(user.id) : [];
  
  // Format date for profile
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <div>
      {user && (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-purple-500 h-32"></div>
            <div className="px-6 pb-6">
              <div className="flex flex-row  items-start  -mt-16 mb-4">
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover"
                />
                <div className="mt-4 md:mt-0 md:ml-4">
                  <h1 className="text-2xl font-bold">@{user.username}</h1>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Image className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-800">{user.stats.totalMemes}</div>
                  <div className="text-xs text-gray-600">Memes Created</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-800">{user.stats.totalUpvotes}</div>
                  <div className="text-xs text-gray-600">Total Upvotes</div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-800">{user.stats.totalViews}</div>
                  <div className="text-xs text-gray-600">Total Views</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'memes'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('memes')}
              >
                My Memes
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'stats'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('stats')}
              >
                Stats
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'badges'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('badges')}
              >
                Badges
              </button>
            </div>
          </div>
          
          {activeTab === 'memes' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Memes</h2>
                <button
                  onClick={() => navigate('/create')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Create New Meme
                </button>
              </div>
              
              {userMemes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userMemes.map(meme => (
                    <MemeCard key={meme.id} meme={meme} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No memes yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first meme and start sharing it with the world!
                  </p>
                  <button
                    onClick={() => navigate('/create')}
                    className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Create a Meme
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Performance Stats</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Meme Performance Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Top Performing Meme</h4>
                    {userMemes.length > 0 ? (
                      <div>
                        {(() => {
                          const topMeme = [...userMemes].sort((a, b) => 
                            (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
                          )[0];
                          
                          return (
                            <div className="flex items-center">
                              <img
                                src={topMeme.imageUrl}
                                alt="Top meme"
                                className="w-16 h-16 object-cover rounded-md mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium">
                                  Net votes: <span className="text-green-600">+{topMeme.stats.upvotes - topMeme.stats.downvotes}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {topMeme.stats.views} views
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No memes created yet</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Most Viewed Meme</h4>
                    {userMemes.length > 0 ? (
                      <div>
                        {(() => {
                          const mostViewedMeme = [...userMemes].sort((a, b) => 
                            b.stats.views - a.stats.views
                          )[0];
                          
                          return (
                            <div className="flex items-center">
                              <img
                                src={mostViewedMeme.imageUrl}
                                alt="Most viewed meme"
                                className="w-16 h-16 object-cover rounded-md mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium">
                                  <span className="text-blue-600">{mostViewedMeme.stats.views}</span> views
                                </div>
                                <div className="text-sm text-gray-500">
                                  {mostViewedMeme.stats.comments} comments
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No memes created yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Achievement Badges</h2>
              
              {user.badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-medium text-gray-800">{badge}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No badges yet</h3>
                  <p className="text-gray-500">
                    Create more memes and engage with the community to earn badges!
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;