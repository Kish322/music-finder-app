"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import SpotifySearchBar from "../searchBar/searchBar";
import { HiMusicNote } from "react-icons/hi";
import { HiOutlineMusicNote } from "react-icons/hi";
import { RiMusicLine } from "react-icons/ri";
import { BsMusicNote } from "react-icons/bs";
import { FaFire } from "react-icons/fa";

interface MusicFormData {
  title: string;
  artist: string;
  album: string;
  notes: string;
  favorites: number;
  genre: string;
}

const MusicForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<MusicFormData>({
    title: "",
    artist: "",
    album: "",
    notes: "",
    favorites: 1,
    genre: "",
  });
  const [fireIconColors, setFireIconColors] = useState([true, false, false, false, false]);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFavoritesClick = (value: number) => {
    setFormData((prevState) => ({
      ...prevState,
      favorites: value,
    }));

    setFireIconColors((prevColors) =>
      prevColors.map((_, index) => index <= value - 1)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if track, album, and artist are all empty
    if (formData.title.trim() === "" && formData.artist.trim() === "" && formData.album.trim() === "") {
      setAlertMessage("Please fill out the Track, Artist, and Album fields using the Spotify Search.");
      setAlertOpen(true);
      return;
    }

    try {
      const res = await fetch("/api/Music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (res.ok) {
        console.log("Playlist created successfully");
        router.push("/");
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <h1>Create your Music</h1>
          <HiMusicNote size="1.7em" />
          <RiMusicLine size="1.7em" />
          <HiOutlineMusicNote size="1.7em" />
          <BsMusicNote size="1.7em" />
        </div>
        <SpotifySearchBar
          updateTitle={(newTitle) => setFormData((prevState) => ({ ...prevState, title: newTitle }))}
          updateArtist={(newArtist) => setFormData((prevState) => ({ ...prevState, artist: newArtist }))}
          updateAlbum={(newAlbum) => setFormData((prevState) => ({ ...prevState, album: newAlbum }))}
          updateGenre={(newGenre) => setFormData((prevState) => ({ ...prevState, genre: newGenre }))}
        />
        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Track</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="track"
          readOnly
          onChange={handleChange}
          value={formData.title}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #802b78, #bd6755)', 
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '5px',
            color: '#fff'
          }}
        />

        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Artist</label>
        <input
          id="artist"
          name="artist"
          type="text"
          placeholder="artist"
          readOnly
          onChange={handleChange}
          value={formData.artist}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #802b78, #bd6755)', 
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '5px',
            color: '#fff'
          }}
        />

        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Album</label>
        <input
          id="album"
          name="album"
          type="text"
          placeholder="album"
          readOnly
          onChange={handleChange}
          value={formData.album}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #802b78, #bd6755)', 
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '5px',
            color: '#fff'
          }}
        />

        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Genre</label>
        <input
          id="genre"
          name="genre"
          type="text"
          placeholder="genre"
          onChange={handleChange}
          required={true}
          value={formData.genre}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #802b78, #bd6755)',
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '5px',
            color: '#fff'
          }}
        />

        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Notes</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Write something about the track..."
          onChange={handleChange}
          required={true}
          value={formData.notes}
          rows={5}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #802b78, #bd6755)', 
            border: '1px solid #ccc',
            padding: '0.5rem',
            borderRadius: '5px',
            color: '#fff' 
          }}
        />
        <label style={{ fontSize: '1.3em', fontWeight: 'bold' }}>Favorites</label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((favorite, index) => (
            <div key={favorite} className="flex items-center" onClick={() => handleFavoritesClick(favorite)}>
              <FaFire
                className={`cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 ${
                  fireIconColors[index] ? 'text-red-500' : 'text-white'
                }`}
                size="2.3em"
              />
              <label>{favorite}</label>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <input
            type="submit"
            className="btn"
            value="Create Playlist"
            style={{ width: '275px', marginTop: '20px' }} 
          />
        </div>
        {alertOpen && formData.title.trim() === "" && formData.artist.trim() === "" && formData.album.trim() === "" && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative mt-4"
            role="alert"
            style={{
              top: "-1%", 
              left: '50%',
              transform: 'translateX(-50%)', 
              maxWidth: "3200px",
              position: 'relative', 
            }}
          >
            <strong className="font-bold">Alert! </strong>
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default MusicForm;