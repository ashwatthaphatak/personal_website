export type TrackId = "infra" | "distributed" | "ml-ai" | "robotics";

export type SkillGroupId =
  | "languages"
  | "systems-os"
  | "distributed-systems"
  | "robotics"
  | "ml-perception"
  | "tools-cloud-devops";

export type NavSection = {
  id: string;
  label: string;
};

export type Profile = {
  name: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  about: string;
  interests: string[];
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
};

export type SkillGroup = {
  id: SkillGroupId;
  title: string;
  items: string[];
};

export type ExperienceRole = {
  id: string;
  organization: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  timeline: string;
  techStack: string[];
  bullets: string[];
  tags: string[];
  links?: ProjectLink[];
};

export type TrackDefinition = {
  id: TrackId;
  label: string;
  skillOrder: SkillGroupId[];
  highlightSkillGroups: SkillGroupId[];
  featuredProjectTags: string[];
};
