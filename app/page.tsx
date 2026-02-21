import { GitHubActivitySection } from "@/components/github-activity-section";
import { ProfileImage } from "@/components/profile-image";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { TrackSwitcher } from "@/components/track-switcher";
import { TrackProvider } from "@/components/track-context";
import { experience } from "@/content/experience";
import { profile, navSections } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { tracks } from "@/content/tracks";

export default function HomePage() {
  return (
    <TrackProvider tracks={tracks} initialTrack="distributed-infra">
      <SiteHeader sections={navSections} siteName={profile.name} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <section id="hero" className="scroll-mt-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <div className="mt-4 grid gap-6 md:grid-cols-[148px_1fr] md:items-center">
            <div className="mx-auto w-fit md:mx-0">
              <ProfileImage
                src={profile.photo.src}
                alt={profile.photo.alt}
                fallbackSrc={profile.photo.fallbackSrc}
                initials="AP"
                className="h-32 w-32 rounded-2xl border border-[var(--border)] object-cover shadow-sm sm:h-36 sm:w-36"
              />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base text-[var(--muted)] sm:text-lg">{profile.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                <span className="rounded-full border border-[var(--border)] px-3 py-1">{profile.location}</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full border border-[var(--border)] px-3 py-1 transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  {profile.email}
                </a>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {profile.interests.slice(0, 6).map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-1 text-xs text-[var(--muted)]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.rolesInterestedIn.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--text)]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:brightness-105"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
            >
              LinkedIn
            </a>
            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] [&::-webkit-details-marker]:hidden">
                Download Resume
              </summary>
              <div className="absolute left-0 z-20 mt-2 flex min-w-64 flex-col gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-sm">
                {profile.links.resumes.map((resume) => (
                  <a
                    key={resume.href}
                    href={resume.href}
                    download
                    className="rounded-md px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-strong)]"
                  >
                    {resume.label}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </section>

        <ScrollReveal>
          <section id="about" className="scroll-mt-40 py-8 sm:py-10">
            <h2 className="text-xl font-semibold text-[var(--text)]">About Me</h2>
            <div className="mt-3 space-y-4">
              {profile.about.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-[var(--muted)] [text-align:justify]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="experience" className="scroll-mt-40 py-8 sm:py-10">
            <h2 className="text-xl font-semibold text-[var(--text)]">Experience</h2>
            <div className="mt-4 grid gap-4">
              {experience.map((role) => (
                <article key={role.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
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
            <TrackSwitcher />
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
          <section
            id="connect"
            className="scroll-mt-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-[var(--text)]">Let&apos;s Connect</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Open to conversations around systems, distributed infrastructure, robotics, and perception engineering.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:brightness-105"
              >
                {profile.email}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                GitHub
              </a>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </TrackProvider>
  );
}
