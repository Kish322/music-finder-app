import React from 'react';
import Navbar from './components/Nav';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Music App!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Featured Songs</h3>
              {/* Content for featured songs */}
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Top Artists</h3>
              {/* Content for top artists */}
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Playlists</h3>
              {/* Content for playlists */}
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Recently Played</h3>
              {/* Content for recently played */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

