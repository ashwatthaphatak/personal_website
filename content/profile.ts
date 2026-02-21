import type { NavSection, Profile } from "@/content/types";

export const profile: Profile = {
  name: "Ashwattha Phatak",
  location: "Raleigh, NC",
  email: "ashwatthap@gmail.com",
  phone: "+1 919-971-3500",
  githubUsername: "ashwatthaphatak",
  tagline:
    "Systems engineer passionate about building reliable distributed infrastructure and robotics perception stacks.",
  about: `Richard Feynman had a habit of puncturing the genius myth. He once said, “I was an ordinary person who studied hard. There’s no miracle people.” That line has shaped how I approach engineering: start from first principles, stay rigorous, and earn understanding through consistent work. I’m not interested in sounding clever; I’m interested in being correct. If I can’t explain something plainly, I don’t count it as understanding yet—and I like work where the feedback is honest, where systems either hold up under stress or expose exactly what you failed to reason about.

My interests sit across operating systems, distributed systems, computer networks, and robotics/perception, and I treat them as one connected discipline around concurrency, uncertainty, and reliability under real constraints. Long term, I want to build large-scale systems with real-world impact: platforms that stay reliable under pressure, serve users at scale, and strengthen the technical foundations future systems depend on—not as a vague idea of “impact,” but as engineering that measurably improves what people can rely on, now and later.`,
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
  rolesInterestedIn: [
    "Distributed Systems Engineer",
    "Infrastructure Software Engineer",
    "Site Reliability Engineer",
    "ML Systems Engineer",
    "Robotics/Perception Engineer"
  ],
  photo: {
    src: "https://github.com/ashwatthaphatak.png?size=400",
    alt: "Ashwattha Phatak profile photo",
    fallbackSrc: "/images/linkedin-profile.jpg"
  },
  links: {
    github: "https://github.com/ashwatthaphatak",
    linkedin: "https://www.linkedin.com/in/ashwatthaphatak/",
    resume: "/resume/Ashwattha_Phatak_Infra.pdf"
  }
};

export const navSections: NavSection[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Technical Skills" },
  { id: "github-activity", label: "GitHub Activity" },
  { id: "interests", label: "Interests" },
  { id: "connect", label: "Let's Connect" }
];
