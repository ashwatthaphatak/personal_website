import type { NavSection, Profile } from "@/content/types";

export const profile: Profile = {
  name: "Ashwattha Phatak",
  location: "Raleigh, NC",
  email: "ashwatthap@gmail.com",
  phone: "+1 919-971-3500",
  tagline:
    "Systems engineer building reliable distributed infrastructure and robotics perception stacks.",
  about:
    "I work at the intersection of systems software, distributed systems, and autonomy. My recent work spans kernel and IPC fundamentals, OTA and observability for embedded Linux fleets, and robotics perception pipelines where reliability and performance matter in production.",
  interests: [
    "Systems Software",
    "Distributed Systems",
    "Infrastructure Reliability",
    "Autonomy",
    "Robotics",
    "Perception",
    "Operating Systems",
    "Edge ML"
  ],
  links: {
    github: "https://github.com/ashwatthaphatak",
    linkedin: "https://www.linkedin.com/in/ashwatthaphatak",
    resume: "/resume/Ashwattha_Phatak_Infra.pdf"
  }
};

export const navSections: NavSection[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Technical Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "connect", label: "Let's Connect" }
];
