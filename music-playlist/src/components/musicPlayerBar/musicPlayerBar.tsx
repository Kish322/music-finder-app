import React from "react";
import ReactPlayer from "react-player";

interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
}

interface MusicPlayerBarProps {
  track: Track | null;
  previewUrl: string | null;
  onStop?: () => void; 
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ track, previewUrl, onStop }) => {
  const handleEnded = () => {
    if (onStop) {
      onStop();
    }
  };

  return (
    <div className="music-player-bar">
      {track && previewUrl && (
        <>
          <div className="music-player-info mb-3" style={{ marginTop: '20px' }}>
            <strong>Now Playing:</strong> {track.name}
          </div>
          <ReactPlayer
            url={previewUrl}
            controls
            playing
            width="100%"
            height="50px"
            onEnded={handleEnded}
          />
        </>
      )}
    </div>
  );
};

export default MusicPlayerBar;