import React from 'react';
import { Smile, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Smile className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Memo</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              The Internet's Playground for Memes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Subscribe to our newsletter
              </p>
              <form className="mt-2">
                <div className="flex max-w-md">
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-l-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Email address"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 border border-purple-600 rounded-r-md py-2 px-4 text-white font-medium"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MemeHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;