import type { TrackDefinition, TrackId } from "@/content/types";

export const tracks: TrackDefinition[] = [
  {
    id: "distributed-infra",
    label: "Distributed Systems & Infrastructure",
    skillOrder: [
      "distributed-systems",
      "systems-os",
      "tools-cloud-devops",
      "languages",
      "robotics",
      "ml-perception"
    ],
    highlightSkillGroups: ["distributed-systems", "systems-os", "tools-cloud-devops"],
    featuredProjectTags: [
      "distributed",
      "consistency",
      "concurrency",
      "filesystems",
      "infra",
      "reliability"
    ]
  },
  {
    id: "ml-ai-robotics",
    label: "Machine Learning, AI, & Robotics",
    skillOrder: [
      "robotics",
      "ml-perception",
      "languages",
      "distributed-systems",
      "systems-os",
      "tools-cloud-devops"
    ],
    highlightSkillGroups: ["robotics", "ml-perception", "languages"],
    featuredProjectTags: ["ml-ai", "robotics", "autonomy", "navigation", "perception", "vision"]
  }
];

export const trackMap: Record<TrackId, TrackDefinition> = tracks.reduce(
  (accumulator, track) => {
    accumulator[track.id] = track;
    return accumulator;
  },
  {} as Record<TrackId, TrackDefinition>
);
