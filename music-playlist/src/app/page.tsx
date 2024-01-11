"use client";
require('dotenv').config();
import React, { useEffect, useState } from 'react';
import Card from '@/app/components/card/card';

interface MusicPlaylist {
  id: number;
  category: string;
  priority: number;
  title: string;
  description: string;
  createdAt: number;
  progress: number;
  status: string;
  // Add more properties as needed
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

  const uniqueCategories = Array.from(new Set(musicPlaylists?.map(({ category }) => category)) || []);

  return (
    <div className="p-5">
      <div>
        {musicPlaylists && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {musicPlaylists.filter((musicPlaylist) => musicPlaylist.category === uniqueCategory).map((filteredMusicPlaylist, index) => (
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
