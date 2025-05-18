import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-sm rounded bg-purple-500 text-white shadow-md hover:bg-purple-600 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {isAuthenticated && (
          <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
