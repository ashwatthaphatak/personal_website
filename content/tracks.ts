import type { TrackDefinition, TrackId } from "@/content/types";

export const tracks: TrackDefinition[] = [
  {
    id: "infra",
    label: "Infra",
    skillOrder: [
      "systems-os",
      "tools-cloud-devops",
      "languages",
      "distributed-systems",
      "robotics",
      "ml-perception"
    ],
    highlightSkillGroups: ["systems-os", "tools-cloud-devops", "distributed-systems"],
    featuredProjectTags: ["infra", "systems", "reliability", "os"]
  },
  {
    id: "distributed",
    label: "Distributed Systems",
    skillOrder: [
      "distributed-systems",
      "languages",
      "systems-os",
      "tools-cloud-devops",
      "ml-perception",
      "robotics"
    ],
    highlightSkillGroups: ["distributed-systems", "languages", "systems-os"],
    featuredProjectTags: ["distributed", "consistency", "concurrency", "filesystems"]
  },
  {
    id: "ml-ai",
    label: "ML/AI",
    skillOrder: [
      "ml-perception",
      "languages",
      "tools-cloud-devops",
      "robotics",
      "distributed-systems",
      "systems-os"
    ],
    highlightSkillGroups: ["ml-perception", "languages", "robotics"],
    featuredProjectTags: ["ml-ai", "perception", "vision", "agents"]
  },
  {
    id: "robotics",
    label: "Robotics",
    skillOrder: [
      "robotics",
      "ml-perception",
      "systems-os",
      "languages",
      "distributed-systems",
      "tools-cloud-devops"
    ],
    highlightSkillGroups: ["robotics", "ml-perception", "systems-os"],
    featuredProjectTags: ["robotics", "autonomy", "navigation", "perception"]
  }
];

export const trackMap: Record<TrackId, TrackDefinition> = tracks.reduce(
  (accumulator, track) => {
    accumulator[track.id] = track;
    return accumulator;
  },
  {} as Record<TrackId, TrackDefinition>
);
