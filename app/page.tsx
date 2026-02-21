import { GitHubActivitySection } from "@/components/github-activity-section";
import { ProfileImage } from "@/components/profile-image";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollReveal } from "@/components/scroll-reveal";
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
    <TrackProvider tracks={tracks} initialTrack="distributed-infra">
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

            <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[var(--panel-shadow)]">
              <div className="flex items-center gap-4">
                <ProfileImage
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  fallbackSrc={profile.photo.fallbackSrc}
                  initials="AP"
                  className="h-24 w-24 rounded-xl border border-[var(--border)] object-cover shadow-sm sm:h-28 sm:w-28"
                />
                <div>
                  <p className="text-base font-semibold text-[var(--text)]">{profile.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{profile.location}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.links.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:brightness-105"
                >
                  Book on Calendly
                </a>
                <details className="group w-full">
                  <summary className="list-none cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] [&::-webkit-details-marker]:hidden">
                    Download Resume
                  </summary>
                  <div className="mt-2 grid gap-2">
                    {profile.links.resumes.map((resume) => (
                      <a
                        key={resume.href}
                        href={resume.href}
                        download
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                      >
                        {resume.label}
                      </a>
                    ))}
                  </div>
                </details>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  {profile.email}
                </a>
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
                    className="relative mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 last:mb-0"
                  >
                    <span className="absolute -left-[1.9rem] top-7 h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]" />

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

        <ScrollReveal>
          <section id="connect" className="section-shell">
            <div className="section-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">Let&apos;s Connect</h2>
                <span className="section-kicker">03</span>
              </div>

              <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
                Open to conversations around systems, distributed infrastructure, robotics, and perception engineering.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href={profile.links.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 text-sm font-medium text-[var(--text)] transition hover:brightness-105"
                >
                  Book on Calendly
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </TrackProvider>
  );
}
