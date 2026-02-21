"use client";

import { useEffect, useMemo, useState } from "react";

import { useTrackContext } from "@/components/track-context";
import type { Project } from "@/content/types";

type ProjectsSectionProps = {
  projects: Project[];
};

function formatTag(tag: string) {
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { activeTrack } = useTrackContext();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTrack.featuredProjectTags);

  useEffect(() => {
    setSelectedTags(activeTrack.featuredProjectTags);
  }, [activeTrack.id, activeTrack.featuredProjectTags]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const query = search.trim().toLowerCase();

  const visibleProjects = useMemo(() => {
    const hasQuery = query.length > 0;

    return projects
      .map((project) => {
        const bag = [
          project.title,
          project.summary,
          ...project.techStack,
          ...project.tags,
          ...project.bullets
        ]
          .join(" ")
          .toLowerCase();

        const matchesQuery = !hasQuery || bag.includes(query);
        const matchingSelectedTagCount = selectedTags.filter((tag) => project.tags.includes(tag)).length;
        const matchesSelectedTags = selectedTags.length === 0 || matchingSelectedTagCount > 0;
        const matchingTrackTagCount = activeTrack.featuredProjectTags.filter((tag) =>
          project.tags.includes(tag)
        ).length;

        const score = matchingTrackTagCount * 4 + matchingSelectedTagCount * 3 + (matchesQuery ? 1 : 0);

        return {
          project,
          score,
          matchesQuery,
          matchesSelectedTags
        };
      })
      .filter((entry) => entry.matchesQuery && entry.matchesSelectedTags)
      .sort((a, b) => b.score - a.score || a.project.title.localeCompare(b.project.title))
      .map((entry) => entry.project);
  }, [activeTrack.featuredProjectTags, projects, query, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => {
      if (current.includes(tag)) {
        return current.filter((item) => item !== tag);
      }

      return [...current, tag];
    });
  };

  return (
    <section id="projects" className="scroll-mt-40 py-8 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold text-[var(--text)]">Projects</h2>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
          {visibleProjects.length} shown
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        <label htmlFor="project-search" className="text-sm font-medium text-[var(--muted)]">
          Search projects
        </label>
        <input
          id="project-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title, tech stack, tags, or keywords"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedTags([])}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            selectedTags.length === 0
              ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
              : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
              }`}
            >
              {formatTag(tag)}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <article key={project.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[var(--text)]">{project.title}</h3>
              <span className="text-xs font-medium text-[var(--muted)]">{project.timeline}</span>
            </div>

            <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>

            <p className="mt-3 text-xs text-[var(--muted)]">
              <span className="font-semibold text-[var(--text)]">Stack:</span> {project.techStack.join(", ")}
            </p>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2 py-1 text-xs text-[var(--muted)]"
                >
                  #{formatTag(tag)}
                </span>
              ))}
            </div>

            {project.links && project.links.filter((link) => link.href.trim() !== "#").length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.links
                  .filter((link) => link.href.trim() !== "#")
                  .map((link) => (
                    <a
                      key={`${project.id}-${link.label}`}
                      href={link.href}
                      className="text-sm font-medium text-[var(--accent)] transition hover:opacity-80"
                    >
                      {link.label}
                    </a>
                  ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
