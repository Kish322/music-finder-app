import React, { useState, useEffect } from "react";
import FavouritesDisplay from "../favoritesDisplay/favoritesDisplay";
import DeleteCard from "../deleteCard/deleteCard";

interface MusicPlaylist {
  _id: number;
  genre: string;
  title: string;
  notes: string;
  favorites: number;
  createdAt: number;
  artist: string;
  album: string;
}

interface CardProps {
  MusicPlaylist: MusicPlaylist;
}

const Card: React.FC<CardProps> = ({ MusicPlaylist }) => {
  const [albumInfo, setAlbumInfo] = useState<{ name: string; imageUrl: string } | null>(null);

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

        const basicAuthToken = btoa(`${clientId}:${clientSecret}`);

        const response = await fetch(`https://accounts.spotify.com/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicAuthToken}`,
          },
          body: "grant_type=client_credentials",
        });

        const data = await response.json();
        const accessToken = data.access_token;

        const trackResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(MusicPlaylist.title)}&type=track`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const trackData = await trackResponse.json();
        if (trackData.tracks?.items.length > 0) {
          const albumName = trackData.tracks.items[0].album.name;
          const imageUrl = trackData.tracks.items[0].album.images[0]?.url; // Assuming the first image in the array is the album cover
          setAlbumInfo({ name: albumName, imageUrl });
        }
      } catch (error) {
        console.error("Error fetching album information from Spotify API:", error);
      }
    };

    fetchAlbumInfo();
  }, [MusicPlaylist.title]);

  return (
    <div className="bg-gradient-to-r from-indigo-800 via-purple-600 to-purple-800 text-white rounded-md shadow-lg p-3 m-4 sm:max-w-sm md:max-w-sm lg:max-w-sm flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:from-purple-800 hover:to-indigo-800">
      <div className="mb-2">
        <div className="flex">
          <FavouritesDisplay favourites={MusicPlaylist.favorites} />
          <div className="ml-auto">
            <DeleteCard id={MusicPlaylist._id} />
          </div>
        </div>
        <h3 className="text-center" style={{ fontFamily: "Permanent Marker", fontSize: "27px" }}>
          {MusicPlaylist.title}
        </h3>
        {albumInfo && (
          <img
            src={albumInfo.imageUrl}
            alt={albumInfo.name}
            className="mx-auto w-full h-auto mb-2"
            style={{ maxWidth: "220px", maxHeight: "150px" }}
          />
        )}
        <p className="text-center" style={{ fontFamily: "Sriracha", fontSize: "19px" }}>
          Album: {MusicPlaylist.album}
        </p>
        <p className="text-center" style={{ fontFamily: "Sriracha", fontSize: "19px" }}>
          Artist: {MusicPlaylist.artist}
        </p>
        <hr className="my-1 h-0.5 border-0 bg-red-400" />
        <p className="whitespace-pre-wrap" style={{ fontFamily: "Salsa", fontSize: "17px" }}>
          Notes: {MusicPlaylist.notes}
        </p>
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mt-auto">
          <p className="text-xs transform translate-y-3">
            Created: {' '}
            {new Date(MusicPlaylist.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;