import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMemes } from '../contexts/MemeContext';
import MemeStats from '../components/meme/MemeStats';
import CommentSection from '../components/meme/CommentSection';

const MemeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMemeById } = useMemes();
  const navigate = useNavigate();
  
  const meme = id ? getMemeById(id) : undefined;
  
  if (!meme) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Meme not found</h2>
        <p className="text-gray-500 mb-6">The meme you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  // Format the date to a user-friendly string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-purple-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src="'https://img.freepik.com/premium-photo/close-up-mannequin-against-blue-background_1048944-15847634.jpg?ga=GA1.1.1449500055.1736427061&semt=ais_hybrid&w=740"
                    alt={meme.creatorUsername}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium">@{meme.creatorUsername}</h3>
                    <span className="text-xs text-gray-500">{formatDate(meme.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {meme.tags.map(tag => (
                  <a
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full hover:bg-purple-100"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
                <img
                  src={meme.imageUrl}
                  alt={`Meme by ${meme.creatorUsername}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {meme.topText && (
                    <div className="text-center">
                      <h3 className="text-white text-2xl md:text-3xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {meme.topText}
                      </h3>
                    </div>
                  )}
                  {meme.bottomText && (
                    <div className="text-center">
                      <h3 className="text-white text-2xl md:text-3xl font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {meme.bottomText}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <CommentSection memeId={meme.id} />
        </div>
        
        <div className="space-y-6">
          <MemeStats meme={meme} detailed={true} />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Share this Meme</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/meme/${meme.id}`);
                  alert('Link copied to clipboard!');
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Copy Link
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Share on Twitter
              </button>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Share on Facebook
              </button>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <h3 className="font-medium text-purple-800 mb-2">Did you know?</h3>
            <p className="text-sm text-purple-700">
              The most upvoted meme on MemeHub received over 50,000 upvotes in a single day! Keep creating great content to break that record!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetailsPage;