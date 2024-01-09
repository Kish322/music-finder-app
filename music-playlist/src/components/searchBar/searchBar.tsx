// SpotifySearchBar.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import MusicPlayerBar from "../musicPlayerBar/musicPlayerBar";
import { FaSpotify } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
require('dotenv').config();

interface Artist {
  name: string;
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

interface SpotifySearchBarProps {
  updateTitle: (newTitle: string) => void;
}

const SpotifySearchBar: React.FC<SpotifySearchBarProps> = ({ updateTitle }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const getClientCredentialsToken = async () => {
      const spotifyClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const spotifyClientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${spotifyClientId}:${spotifyClientSecret}`)}`,
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.access_token;
          setAccessToken(newAccessToken);
        } else {
          console.error("Failed to get access token");
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    getClientCredentialsToken();
  }, []); // Run once on mount

  useEffect(() => {
    const searchSpotify = async () => {
      if (!accessToken || query.trim() === "") {
        setSearchResults([]); // Clear search results when the query is empty
        return;
      }

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.tracks.items);
        } else {
          console.error("Failed to search on Spotify");
        }
      } catch (error) {
        console.error("Error searching Spotify:", error);
      }
    };

    searchSpotify();
  }, [query, accessToken]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setFetchError(false); // Reset fetch error when the input changes
    // Clear selected track and preview URL when the input is empty
    if (e.target.value.trim() === "") {
      setSelectedTrack(null);
      setPreviewUrl(null);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedTrack(null);
    setPreviewUrl(null);
  };

  const handleTrackClick = async (track: Track) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${track.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const trackPreviewUrl = data.preview_url;

        if (trackPreviewUrl) {
          setSelectedTrack(track);
          updateTitle(track.name);
          setPreviewUrl(trackPreviewUrl);
        } else {
          console.error("Track does not have a preview URL");
          setFetchError(true);
        }
      } else {
        console.error("Failed to get track details from Spotify");
        setFetchError(true);
      }
    } catch (error) {
      console.error("Error fetching track details from Spotify:", error);
      setFetchError(true);
    }
  };

  return (
    <div className="container mx-auto my-8 rounded p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <label className="text-2xl font-bold mb-2">
        <FaSpotify className="inline mr-1 mt-0" style={{ fontSize: '1.5em' }} /> Search on Spotify
      </label>
      <div className="relative">
        <input
          placeholder="Search for a track"
          value={query}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-solid border-white-800 rounded focus:outline-none bg-transparent mt-3"
          style={{ color: "white" }}
        />
        {query && (
          <button
            className="absolute right-2.5 top-7 text-white cursor-pointer"
            onClick={clearSearch}
          >
            <ImCancelCircle size="1.3em" />
          </button>
        )}
      </div>
      {fetchError && (
        <div className="text-red-500 mt-2">
          This track may not have a preview URL.
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {searchResults.slice(0, 4).map((track) => (
          <div
            key={track.id}
            className="bg-gradient-to-br from-card to-card-hover rounded p-4 hover:from-card-hover hover:to-card cursor-pointer transition duration-300 transform hover:scale-105"
            onClick={() => handleTrackClick(track)}
          >
            <strong className="block mb-3 text-white">{track.name}</strong>
            <img
              src={track.album.images[0]?.url}
              alt={`${track.name} Poster`}
              className="w-full h-auto rounded"
            />
            <div className="mt-2 text-center text-white">
              <p className="mb-1">Artist: {track.artists.map(artist => artist.name).join(', ')}</p>
              <p>Album: {track.album.name}</p>
            </div>
          </div>
        ))}
      </div>
      {previewUrl && <MusicPlayerBar track={selectedTrack} previewUrl={previewUrl} />}
    </div>
  );
};

export default SpotifySearchBar;
