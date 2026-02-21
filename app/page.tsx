import type { ReactNode } from "react";

import { BootSequenceProvider } from "@/components/boot-sequence";
import { GitHubActivitySection } from "@/components/github-activity-section";
import { ProfileImage } from "@/components/profile-image";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { TrackProvider } from "@/components/track-context";
import { experience } from "@/content/experience";
import { profile, navSections } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { tracks } from "@/content/tracks";

export default function HomePage() {
  const aboutParagraphs = profile.about.split("\n\n");

  return (
    <BootSequenceProvider>
      <TrackProvider tracks={tracks} initialTrack="distributed-infra">
        <ScrollProgress />
        <SiteHeader sections={navSections} siteName={profile.name} />

        <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
          <section
            id="hero"
            className="scroll-mt-32 relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] sm:p-8 lg:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[var(--accent-soft)] opacity-75 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-12 h-60 w-60 rounded-full bg-[var(--surface-strong)] opacity-85 blur-3xl"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
              <div className="space-y-5">
                <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  Systems x AI Portfolio
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                  {profile.name}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{profile.tagline}</p>

                <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
                  <span className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5">
                    {profile.location}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {profile.rolesInterestedIn.map((role) => (
                      <span
                        key={role}
                        className="rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs tracking-[0.06em] text-[var(--text)]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.slice(0, 6).map((interest) => (
                      <span
                        key={interest}
                        className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-1 text-xs text-[var(--muted)]"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="interactive-card rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[var(--panel-shadow)]">
                <div className="flex flex-col items-start gap-4">
                  <ProfileImage
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    fallbackSrc={profile.photo.fallbackSrc}
                    initials="AP"
                    className="h-40 w-40 rounded-xl border border-[var(--border)] object-cover shadow-sm sm:h-44 sm:w-44"
                  />

                  <div>
                    <p className="text-base font-semibold text-[var(--text)]">{profile.name}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{profile.location}</p>
                  </div>

                  <div className="flex w-full flex-wrap items-center gap-2">
                    <SocialIconLink
                      href={`mailto:${profile.email}`}
                      label="Gmail"
                      icon={<MailIcon />}
                      className="h-10 w-10"
                    />
                    <SocialIconLink
                      href={profile.links.linkedin}
                      label="LinkedIn"
                      icon={<LinkedInIcon />}
                      className="h-10 w-10"
                    />
                    <SocialIconLink
                      href={profile.links.github}
                      label="GitHub"
                      icon={<GitHubIcon />}
                      className="h-10 w-10"
                    />
                    <SocialIconLink
                      href={profile.links.calendly}
                      label="Calendly"
                      icon={<CalendlyIcon />}
                      className="h-10 w-10"
                    />
                    <details className="group relative">
                      <summary className="list-none cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text)] transition hover:border-[var(--accent)] [&::-webkit-details-marker]:hidden">
                        Resume
                      </summary>
                      <div className="absolute left-0 top-12 z-20 grid min-w-[13rem] gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--panel-shadow)]">
                        {profile.links.resumes.map((resume) => (
                          <a
                            key={resume.href}
                            href={resume.href}
                            download
                            className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-2 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                          >
                            {resume.label}
                          </a>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <ScrollReveal>
            <section id="about" className="section-shell">
              <div className="section-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">About Me</h2>
                  <span className="section-kicker">01</span>
                </div>
                <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 sm:p-5">
                  <div className="space-y-4">
                    {aboutParagraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-[var(--muted)] [text-align:justify]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section id="experience" className="section-shell">
              <div className="section-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">Experience</h2>
                  <span className="section-kicker">02</span>
                </div>

                <div className="mt-6 border-l border-dashed border-[var(--border)] pl-6">
                  {experience.map((role) => (
                    <article
                      key={role.id}
                      className="interactive-card relative mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 last:mb-0"
                    >
                      <span className="timeline-node absolute -left-[1.9rem] top-7 h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]" />

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text)]">
                            {role.organization} - {role.title}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">{role.location}</p>
                        </div>
                        <p className="text-sm font-medium text-[var(--muted)]">{role.dates}</p>
                      </div>

                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--muted)]">
                        {role.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectsSection projects={projects} />
          </ScrollReveal>

          <ScrollReveal>
            <SkillsSection groups={skillGroups} />
          </ScrollReveal>

          <ScrollReveal>
            <GitHubActivitySection username={profile.githubUsername} profileUrl={profile.links.github} />
          </ScrollReveal>

        </main>
      </TrackProvider>
    </BootSequenceProvider>
  );
}

type SocialIconLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
};

function SocialIconLink({ href, label, icon, className = "" }: SocialIconLinkProps) {
  const isExternal = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)] ${className}`}
    >
      {icon}
    </a>
  );
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.5 5.8.4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.8 9.3h4.4V21H2.8V9.3Zm7 0h4.2v1.6h.1c.6-1.1 2-1.9 4-1.9 4.3 0 5.1 2.8 5.1 6.5V21h-4.4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21H9.8V9.3Z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6L19.5 7" />
    </svg>
  );
}

function CalendlyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="16" rx="3" />
      <path d="M3.5 9h17M8 3.5v3M16 3.5v3" />
      <path d="M14.8 14.5a2.8 2.8 0 1 1-1-2.2" />
    </svg>
  );
}
