import React from "react";
import PriorityDisplay from "../priorityDisplay/priorityDisplay";
import ProgressDisplay from "../progressDisplay/progressDisplay";
import StatusDisplay from "../statusDisplay/statusDisplay";
import DeleteCard from "../deleteCard/deleteCard";

interface MusicPlaylist {
  priority: number;
  id: number;
  category: string;
  title: string;
  description: string;
  createdAt: number;
  progress: number;
  status: string;
  // Add more properties as needed
}

interface CardProps {
  MusicPlaylist: MusicPlaylist;
}

const Card: React.FC<CardProps> = ({ MusicPlaylist }) => {
    return (
        <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
          <div className="flex mb-3">
            <PriorityDisplay priority={MusicPlaylist.priority} />
            <div className="ml-auto"></div>
            <DeleteCard />
          </div>
          <h4>{MusicPlaylist.title}</h4>
          <hr className="h-px border-0 bg-page mb-2" />
          <p className="whitespace-pre-wrap">{MusicPlaylist.description}</p>
          <div className="flex-grow"></div>
          <div className="flex mt-2">
            <div className="flex flex-col">
              <p className="text-xs my-1">{MusicPlaylist.createdAt}</p>
              <ProgressDisplay progress={MusicPlaylist.progress} />
            </div>
            <div className="ml-auto flex items-end">
              <StatusDisplay status={MusicPlaylist.status} />
            </div>
          </div>
        </div>
      );
    };

export default Card;