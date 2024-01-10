"use client";
require('dotenv').config();
import { useRouter } from "next/navigation";
import SpotifySearchBar from "../searchBar/searchBar";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { HiMusicNote } from "react-icons/hi";
import { HiOutlineMusicNote } from "react-icons/hi";
import { RiMusicLine } from "react-icons/ri";
import { BsMusicNote } from "react-icons/bs";

interface MusicFormData {
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  category: string;
}

const MusicForm: React.FC = () => {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFromData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

  const startingMusicData: MusicFormData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "hip-hop",
  };

  const [formData, setFromData] = useState<MusicFormData>(startingMusicData);

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2"> 
          <h1>Create your Music</h1> 
          <HiMusicNote  size="1.7em" />
          <RiMusicLine size="1.7em" />
          <HiOutlineMusicNote size="1.7em" />
          <BsMusicNote size="1.7em" />
        </div>
        <SpotifySearchBar updateTitle={(newTitle) => setFromData((prevState) => ({ ...prevState, title: newTitle }))} />
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="hip-hop">Hip Hop</option>
          <option value="rap">Rap</option>
          <option value="funny">Funny</option>
        </select>
        <label>Priority</label>
        <div>
          {[1, 2, 3, 4, 5].map((priority) => (
            <React.Fragment key={priority}>
              <label>{priority}</label>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority === priority}
              />
            </React.Fragment>
          ))}
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn" value="Create Playlist" />
      </form>
    </div>
  );
};

export default MusicForm;