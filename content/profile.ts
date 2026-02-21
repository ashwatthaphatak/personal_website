import type { NavSection, Profile } from "@/content/types";

export const profile: Profile = {
  name: "Ashwattha Phatak",
  location: "Raleigh, NC",
  email: "ashwatthap@gmail.com",
  phone: "+1 919-971-3500",
  githubUsername: "ashwatthaphatak",
  tagline:
    "Systems engineer passionate about building reliable distributed infrastructure and robotics perception stacks.",
  about: `Richard Feynman had a habit of puncturing the genius myth. He once said, "I was an ordinary person who studied hard. There's no miracle people." That line has shaped how I approach engineering: start from first principles, stay rigorous, and earn understanding through consistent work.

My work sits across operating systems, distributed systems, computer networks, and robotics/perception. I treat these as one connected discipline around concurrency, uncertainty, and reliability, especially when software has to perform under real constraints.

Long term, I want to build large-scale systems with real-world impact: platforms that stay reliable under pressure, serve users at scale, and improve the technical foundations that future systems depend on.`,
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
