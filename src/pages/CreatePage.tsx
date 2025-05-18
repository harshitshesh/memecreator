import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MemeCreator from '../components/meme/MemeCreator';

const CreatePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }
  
  const handleMemeCreated = (memeId: string) => {
    navigate(`/meme/${memeId}`);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a Meme</h1>
      <MemeCreator onComplete={handleMemeCreated} />
    </div>
  );
};

export default CreatePage;