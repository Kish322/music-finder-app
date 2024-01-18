// Import necessary libraries and components
"use client";
import React, { useState, useEffect } from 'react';

import MusicForm from '@/app/components/form/form';
import { NextPage } from 'next';

interface MusicPageProps {
  params: {
    id: string;
  };
}

const MusicPage: NextPage<MusicPageProps> = ({ params }) => {
  const [musicData, setMusicData] = useState<any>(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch(`/api/Music/${params.id}`);
        const data = await response.json();
        setMusicData(data.musicFound);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, [params.id]);

  const handleUpdate = async (updatedMusicData: any) => {
    try {
      const response = await fetch(`/api/Music/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: updatedMusicData }),
      });

      const data = await response.json();
      if (response.ok) {
        setMusicData(data.updatedMusic);
        // Optionally, you can provide user feedback on successful update
        console.log('Music updated successfully');
      } else {
        console.error('Error updating music:', data.message);
      }
    } catch (error) {
      console.error('Error updating music:', error);
    }
  };

  return <MusicForm musicData={musicData} onUpdate={handleUpdate} />;
};

export default MusicPage;
