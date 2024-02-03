"use client";
import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videosrc: string;
}
const VideoPlayer = ({ videosrc }: VideoPlayerProps) => {
  return (
    <div className="h-full w-full">
      <ReactPlayer
        width="100%"
        height="100%"
        url={videosrc}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
      <source src={videosrc} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
