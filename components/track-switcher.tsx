"use client";

import { useTrackContext } from "@/components/track-context";

type TrackSwitcherProps = {
  compact?: boolean;
};

function getCompactLabel(trackId: string, fullLabel: string) {
  if (trackId === "distributed-infra") {
    return "Dist/Infra";
  }
  if (trackId === "ml-ai-robotics") {
    return "ML/AI/Robotics";
  }
  return fullLabel;
}

export function TrackSwitcher({ compact = false }: TrackSwitcherProps) {
  const { trackId, setTrackId, tracks } = useTrackContext();

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 ${
        compact ? "" : "w-full"
      }`}
    >
      <div className={`grid gap-1 ${compact ? "sm:grid-cols-2" : "w-full sm:grid-cols-2"}`}>
        {tracks.map((track) => {
          const isActive = track.id === trackId;

          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setTrackId(track.id)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)] shadow-[var(--button-shadow)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
              }`}
            >
              {compact ? getCompactLabel(track.id, track.label) : track.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
