import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    username: 'meme_lord',
    email: 'meme@example.com',
    profileImage: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: new Date('2023-01-15').toISOString(),
    stats: {
      totalMemes: 23,
      totalUpvotes: 1542,
      totalViews: 12305
    },
    badges: ['First Viral Post', '10k Views Club']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in (from localStorage in a real app)
    const savedUser = localStorage.getItem('memeHubUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('memeHubUser');
      }
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user (in a real app, this would be an API request)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Set user in state and localStorage
    setUser(foundUser);
    localStorage.setItem('memeHubUser', JSON.stringify(foundUser));
  };
  
  const signup = async (email: string, username: string, password: string) => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists (in a real app, this would be an API request)
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      username,
      email,
      profileImage: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=100',
      createdAt: new Date().toISOString(),
      stats: {
        totalMemes: 0,
        totalUpvotes: 0,
        totalViews: 0
      },
      badges: []
    };
    
    // In a real app, we would save the user to the database
    mockUsers.push(newUser);
    
    // Set user in state and localStorage
    setUser(newUser);
    localStorage.setItem('memeHubUser', JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('memeHubUser');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};