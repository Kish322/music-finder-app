import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-lg font-semibold">Logo</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative text-gray-300 focus-within:text-gray-500">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21l-4.35-4.35" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </span>
              <input className="bg-gray-700 text-white rounded-md py-2 pl-10 pr-20 focus:outline-none focus:bg-white focus:text-gray-900" type="text" placeholder="Search" />
            </div>
          </div>
          <div className="flex">
            <a href="/" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/signup" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Sign Up</a>
            <a href="/login" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;