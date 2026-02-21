"use client";

import { useTrackContext } from "@/components/track-context";

export function TrackSwitcher() {
  const { trackId, setTrackId, tracks } = useTrackContext();

  return (
    <div className="mt-6 inline-flex w-full flex-wrap gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
      {tracks.map((track) => {
        const isActive = track.id === trackId;

        return (
          <button
            key={track.id}
            type="button"
            onClick={() => setTrackId(track.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "border border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
            }`}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  );
}
