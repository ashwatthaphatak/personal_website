import type { NavSection, Profile } from "@/content/types";

export const profile: Profile = {
  name: "Ashwattha Phatak",
  location: "Raleigh, NC",
  email: "ashwatthap@gmail.com",
  phone: "+1 919-971-3500",
  githubUsername: "ashwatthaphatak",
  tagline:
    "Computer Science New Grad (graduating May 2026) passionate about being a part of building the future of computer systems, distributed systems and autonomous driving technology.",
  about: `Richard Feynman had a habit of puncturing the genius myth. He once said, “I was an ordinary person who studied hard. There’s no miracle people.” That line has shaped how I approach engineering at the start of my career: first principles first, rigor over shortcuts, and understanding earned by building and pressure-testing real systems.

My work sits across operating systems, distributed systems, computer networks, and robotics/perception, and I treat them as one discipline around concurrency, uncertainty, and reliability under constraints. I build for correctness and performance under concurrency and failure, and for autonomy/perception pipelines that keep working when compute, latency, and sensing are all constrained.`,
  fastScan: {
    seeking:
      "New Grad (May 2026) roles: Systems Software, Distributed Systems/Infrastructure, Autonomous Systems, and ML Systems.",
    proofPoints: [
      "Systems + infrastructure track: C/C++, Linux systems programming, kernel scheduling and demand paging (Xinu), filesystem internals (copy-on-write snapshots, journaling, crash recovery), sockets/concurrency control, distributed coordination, and reliability-oriented debugging under failure.",
      "Autonomy + ML track: ROS2/Nav2/Gazebo/CARLA pipelines, OpenPCDet + PointPillars optimization, Kalman/Particle filtering, RL policy evaluation (Q-learning/SARSA), and end-to-end perception-to-control validation under constrained compute and noisy sensing."
    ],
    cta:
      "If you’re hiring for systems/distributed or autonomy/ML systems roles, email me at ashwatthap@gmail.com."
  },
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
    "Systems Software Engineer",
    "Distributed Systems Engineer",
    "Production Support Engineer",
    "Autonomous Driving Engineer",
    "Robotics/Perception Engineer",
    "Machine Learning Engineer"
  ],
  photo: {
    src: "/images/linkedin-profile.JPG",
    alt: "Ashwattha Phatak profile photo",
    fallbackSrc: "https://github.com/ashwatthaphatak.png?size=400"
  },
  links: {
    github: "https://github.com/ashwatthaphatak",
    linkedin: "https://www.linkedin.com/in/ashwatthaphatak/",
    calendly: "https://calendly.com/ashwatthap/30min",
    resumes: [
      {
        label: "Distributed Resume",
        href: "/resume/Ashwattha_Phatak_Distributed.pdf"
      },
      {
        label: "ML/AI Resume",
        href: "/resume/Ashwattha_Phatak_MLAI.pdf"
      }
    ]
  }
};

export const navSections: NavSection[] = [
  { id: "hero", label: "Hero" },
  { id: "fast-scan", label: "Fast Scan" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Technical Skills" },
  { id: "github-activity", label: "GitHub Activity" }
];
