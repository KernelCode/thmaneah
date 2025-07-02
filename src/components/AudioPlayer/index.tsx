"use client";

import useAudioStore from "@/lib/store";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, isPlaying: storeIsPlaying } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      if (storeIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [storeIsPlaying]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-0 right-0 ">
      <audio ref={audioRef} src={currentTrack} controls className="w-full shadow-lg " />
    </div>
  );
};

export default AudioPlayer;
