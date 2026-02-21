import type { NavSection, Profile } from "@/content/types";

export const profile: Profile = {
  name: "Ashwattha Phatak",
  location: "Raleigh, NC",
  email: "ashwatthap@gmail.com",
  phone: "+1 919-971-3500",
  githubUsername: "ashwatthaphatak",
  tagline:
    "Systems engineer passionate about building reliable distributed infrastructure and robotics perception stacks.",
  about: `Richard Feynman had a habit of puncturing the genius myth. He once said, “I was an ordinary person who studied hard. There’s no miracle people.” That line has shaped how I approach engineering: start from first principles, stay rigorous, and earn understanding through consistent work. I’m not interested in sounding clever; I’m interested in being correct. If I can’t explain something plainly, I don’t count it as understanding yet. I like work where the feedback is honest: the system either behaves or it doesn’t, and the gap between intention and reality is something you can measure, debug, and close.

My interests sit across operating systems, distributed systems, computer networks, and robotics/perception. I don’t treat these as separate topics. To me they’re one connected discipline about how complex software behaves when the world refuses to be clean. Operating systems force you to confront concurrency, scheduling, memory, and the hidden costs behind abstractions. Networks add time and partial failure—latency, loss, reordering, retries—and suddenly “correct” becomes probabilistic unless you design for it. Distributed systems takes those constraints and asks you to build something coherent anyway: coordination, replication, consistency trade-offs, failure handling. Robotics and perception then bring all of it into environments where uncertainty isn’t rare, it’s the baseline, and where the system has to make decisions and keep performing without perfect information.

What I care about in all of these is reliability under real constraints. I’m drawn to the kinds of problems where success isn’t a demo that works once, but a system that keeps working when it’s stressed: when load spikes, when components are slow, when inputs drift, when the “obvious” assumptions stop holding. I like making systems more legible—through clean interfaces, careful measurement, and designs that fail in understandable ways instead of surprising ways. And I like performance work for the same reason: it forces you to be honest about bottlenecks and trade-offs, not just optimistic.

Long term, I want to build large-scale systems with real-world impact: platforms that stay reliable under pressure, serve users at scale, and improve the technical foundations that future systems depend on. Not “scale” as a vanity metric, but scale as accountability—where small design choices become large consequences, and where rigor turns into something users can actually feel as reliability, speed, and trust. I want to be in the kind of environment where the bar is high, the problems are hard for real reasons, and the work you do compounds into infrastructure and autonomy systems that matter not just for today, but for what comes next.`,
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
