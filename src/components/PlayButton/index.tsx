"use client";
import useAudioStore from "@/lib/store";
import { CirclePause, CirclePlay } from "lucide-react";

const PlayButton = ({ episodeUrl }: { episodeUrl: string }) => {
  const { setCurrentTrack, currentTrack } = useAudioStore();
  return (
    <button
      onClick={() => {
        if (currentTrack !== episodeUrl) {
          setCurrentTrack(episodeUrl);
        } else {
          setCurrentTrack("");
        }
      }}
      className="px-4 py-2 rounded-lg transition-colors"
    >
      <CirclePlay className={`size-6 text-white ${currentTrack === episodeUrl ? "hidden" : "block"}`} />
      <CirclePause className={`size-6 text-white ${currentTrack !== episodeUrl ? "hidden" : "block"}`} />
    </button>
  );
};

export default PlayButton;
