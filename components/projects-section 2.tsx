"use client";

import { useEffect, useMemo, useState } from "react";

import { useTrackContext } from "@/components/track-context";
import type { Project } from "@/content/types";

type ProjectsSectionProps = {
  projects: Project[];
};

const MONTH_TO_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function formatTag(tag: string) {
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseTimelinePoint(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return Number.NEGATIVE_INFINITY;
  }

  if (trimmed === "present" || trimmed === "current" || trimmed === "now") {
    return new Date().getTime();
  }

  const tokens = trimmed.replace(",", "").split(/\s+/).filter(Boolean);
  if (tokens.length === 1 && /^\d{4}$/.test(tokens[0])) {
    const year = Number(tokens[0]);
    return new Date(year, 11, 31).getTime();
  }

  if (tokens.length >= 2) {
    const monthIndex = MONTH_TO_INDEX[tokens[0]];
    const year = Number(tokens[tokens.length - 1]);

    if (Number.isFinite(monthIndex) && Number.isFinite(year)) {
      return new Date(year, monthIndex + 1, 0).getTime();
    }
  }

  return Number.NEGATIVE_INFINITY;
}

function parseTimelineRange(timeline: string) {
  const parts = timeline.split(/\s*[–-]\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) {
    return {
      start: Number.NEGATIVE_INFINITY,
      end: Number.NEGATIVE_INFINITY
    };
  }

  if (parts.length === 1) {
    const point = parseTimelinePoint(parts[0]);
    return {
      start: point,
      end: point
    };
  }

  return {
    start: parseTimelinePoint(parts[0]),
    end: parseTimelinePoint(parts[parts.length - 1])
  };
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
        const timeline = parseTimelineRange(project.timeline);

        return {
          project,
          score,
          timelineEnd: timeline.end,
          timelineStart: timeline.start,
          matchesQuery,
          matchesSelectedTags
        };
      })
      .filter((entry) => entry.matchesQuery && entry.matchesSelectedTags)
      .sort(
        (a, b) =>
          b.timelineEnd - a.timelineEnd ||
          b.timelineStart - a.timelineStart ||
          b.score - a.score ||
          a.project.title.localeCompare(b.project.title)
      )
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
    <section id="projects" className="section-shell">
      <div className="section-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">Projects</h2>
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
            {visibleProjects.length} shown
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          <label htmlFor="project-search" className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
            Search projects
          </label>
          <input
            id="project-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, stack, tags, or keywords"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition ${
              selectedTags.length === 0
                ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
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
                className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition ${
                  isSelected
                    ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
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
            <article
              key={project.id}
              className="interactive-card group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 pl-6 transition hover:border-[var(--accent)]"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-[var(--text)]">{project.title}</h3>
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
                  {project.timeline}
                </span>
              </div>

              <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>

              <p className="mt-3 text-xs text-[var(--muted)]">
                <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Stack:</span>{" "}
                {project.techStack.join(", ")}
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
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--muted)]"
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
                        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                      >
                        {link.label}
                      </a>
                    ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
