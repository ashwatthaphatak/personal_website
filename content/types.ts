export type TrackId = "distributed-infra" | "ml-ai-robotics";

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
  githubUsername: string;
  tagline: string;
  about: string;
  fastScan: {
    seeking: string;
    proofPoints: string[];
    cta: string;
  };
  interests: string[];
  rolesInterestedIn: string[];
  photo: {
    src: string;
    alt: string;
    fallbackSrc?: string;
  };
  links: {
    github: string;
    linkedin: string;
    calendly: string;
    resumes: {
      label: string;
      href: string;
    }[];
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
  proof: string;
  timeline: string;
  techStack: string[];
  metrics: string[];
  bullets: string[];
  tags: string[];
  links: ProjectLink[];
};

export type SkillColumn = {
  id: string;
  title: string;
  strongLabel: string;
  strong: string[];
  familiarLabel: string;
  familiar: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  sourceUrl?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  content: string[];
};

export type TrackDefinition = {
  id: TrackId;
  label: string;
  skillOrder: SkillGroupId[];
  highlightSkillGroups: SkillGroupId[];
  featuredProjectTags: string[];
};
