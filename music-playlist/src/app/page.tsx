"use client";
import React, { useEffect, useState } from 'react';
import Card from '@/app/components/card/card';

interface MusicPlaylist {
  _id: number;
  genre: string;
  favorites: number;
  title: string;
  notes: string;
  createdAt: number;
  artist: string;
  album: string;
}

const Dashboard: React.FC = () => {
  const [musicPlaylists, setMusicPlaylists] = useState<MusicPlaylist[]>([]);

  const getMusicPlaylist = async (): Promise<{ music: MusicPlaylist[] }> => {
    try {
      const res = await fetch("/api/Music", {
        cache: "no-store",
      });
      return res.json();
    } catch (error) {
      console.log("Failed to get music playlist", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const { music } = await getMusicPlaylist();
      setMusicPlaylists(music || []);
    } catch (error) {
      console.error("Error in fetching music playlist:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const extractFirstGenre = (fullGenre: string): string => {
    const parts = fullGenre.split(', ');
    return parts[0];
  };

  const uniqueGenres = Array.from(new Set(musicPlaylists?.map(({ genre }) => extractFirstGenre(genre.toLowerCase())) || [])).sort();

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold mb-4" style={{ fontFamily: 'Rock Salt', fontSize: '35px', color: 'green' }}>My Music Library</h1>
      <div>
        {musicPlaylists && uniqueGenres?.map((uniqueGenre, genreIndex) => (
          <div key={genreIndex} className="mb-4">
            <h2 style={{ fontFamily: 'Rock Salt', fontSize: '30px', color: 'orange' }}>{uniqueGenre}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {musicPlaylists
                .filter((musicPlaylist) => extractFirstGenre(musicPlaylist.genre.toLowerCase()) === uniqueGenre)
                .sort((a, b) => b.favorites - a.favorites) 
                .map((filteredMusicPlaylist, index) => (
                  <Card
                    key={index}
                    MusicPlaylist={filteredMusicPlaylist}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
