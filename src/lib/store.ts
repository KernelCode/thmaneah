import { create } from "zustand";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack?: string;
  volume: number;
  progress: number;
}

interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  setCurrentTrack: (track: string) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
}

const useAudioStore = create<AudioPlayerState & AudioPlayerActions>((set) => ({
  // Initial state
  isPlaying: false,
  currentTrack: undefined,
  volume: 1,
  progress: 0,

  // Actions
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setProgress: (progress) => set({ progress: Math.max(0, Math.min(1, progress)) }),
  reset: () =>
    set({
      isPlaying: false,
      currentTrack: undefined,
      progress: 0,
    }),
}));

export default useAudioStore;
