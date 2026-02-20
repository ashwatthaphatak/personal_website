"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react";

import type { TrackDefinition, TrackId } from "@/content/types";

type TrackContextValue = {
  trackId: TrackId;
  setTrackId: Dispatch<SetStateAction<TrackId>>;
  activeTrack: TrackDefinition;
  tracks: TrackDefinition[];
};

const TrackContext = createContext<TrackContextValue | null>(null);

type TrackProviderProps = {
  children: ReactNode;
  tracks: TrackDefinition[];
  initialTrack: TrackId;
};

export function TrackProvider({ children, tracks, initialTrack }: TrackProviderProps) {
  const [trackId, setTrackId] = useState<TrackId>(initialTrack);

  const activeTrack = useMemo(() => {
    return tracks.find((track) => track.id === trackId) ?? tracks[0];
  }, [trackId, tracks]);

  const value = useMemo(
    () => ({ trackId, setTrackId, activeTrack, tracks }),
    [trackId, activeTrack, tracks]
  );

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>;
}

export function useTrackContext() {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("useTrackContext must be used inside TrackProvider");
  }

  return context;
}
