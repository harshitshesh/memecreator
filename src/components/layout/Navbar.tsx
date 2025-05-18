import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, Film, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setMobileMenuOpen(false);
  }
};


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-yellow-100 bg-opacity-70 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between h-16 min-w-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 select-none"
          >
            <Film className="h-8 w-8 text-purple-700" />
            <span className="font-extrabold text-2xl text-purple-800">Memo</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 min-w-0 mx-4 max-w-full">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memes or tags..."
               className="w-full py-3 pl-10 pr-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
style={{ minHeight: '42px' }}

              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 font-semibold text-purple-700 rounded-md hover:bg-black hover:bg-opacity-10 hover:shadow-lg transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="px-3 py-2 font-semibold text-purple-700 rounded-md hover:bg-black hover:bg-opacity-10 hover:shadow-lg transition-all duration-300"
            >
              Trending
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="bg-purple-500 hover:bg-blue-100 text-black px-4 py-2 rounded-full shadow-md hover:shadow-black hover:brightness-110 transition-all duration-300"
                >
                  Create Meme
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-purple-900 transition-colors">
                    <img
                      src={
                        user?.profileImage ||
                        'https://img.freepik.com/premium-photo/close-up-mannequin-against-blue-background_1048944-15847634.jpg?ga=GA1.1.1449500055.1736427061&semt=ais_hybrid&w=740'
                      }
                      alt={user?.username}
                      className="h-8 w-15 rounded-full object-cover shadow-md"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full font-semibold text-purple-700 border border-purple-700 hover:bg-black hover:bg-opacity-10 hover:shadow-lg transition-all duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-black hover:brightness-110 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-purple-700 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-purple-700" /> : <Menu className="h-6 w-6 text-purple-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-700 pt-2 pb-4 px-4 w-full overflow-auto max-w-full">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memes..."
              className="w-full py-3 pl-10 pr-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
              style={{ minHeight: '42px' }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </form>

          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-20 hover:shadow-lg transition-all duration-300 text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-20 hover:shadow-lg transition-all duration-300 text-white font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trending
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-black hover:brightness-110 transition-all duration-300 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Meme
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-20 hover:shadow-lg transition-all duration-300 flex items-center text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-20 hover:shadow-lg transition-all duration-300 flex items-center w-full text-left text-white font-semibold"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-center hover:bg-black hover:bg-opacity-20 hover:shadow-lg rounded-md transition-all duration-300 text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-full transition-colors text-center font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
