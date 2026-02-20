import { ProjectsSection } from "@/components/projects-section";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { TrackProvider } from "@/components/track-context";
import { experience } from "@/content/experience";
import { profile, navSections } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { tracks } from "@/content/tracks";

export default function HomePage() {
  return (
    <TrackProvider tracks={tracks} initialTrack="infra">
      <SiteHeader sections={navSections} siteName={profile.name} />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <section id="hero" className="scroll-mt-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Hero</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
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

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
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
            <a
              href={profile.links.resume}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              download
            >
              Download Resume
            </a>
          </div>
        </section>

        <section id="about" className="scroll-mt-40 py-14 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">About Me</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--muted)]">{profile.about}</p>
        </section>

        <SkillsSection groups={skillGroups} />

        <section id="experience" className="scroll-mt-40 py-14 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Experience</h2>
          <div className="mt-6 grid gap-4">
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
        </section>

        <ProjectsSection projects={projects} />

        <section id="interests" className="scroll-mt-40 py-14 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Interests</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)]"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        <section
          id="connect"
          className="scroll-mt-40 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Let&apos;s Connect</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Open to conversations around systems, distributed infrastructure, robotics, and perception engineering.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
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
      </main>
    </TrackProvider>
  );
}
