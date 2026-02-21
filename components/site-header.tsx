"use client";

import { useEffect, useMemo, useState } from "react";

import { useTrackContext } from "@/components/track-context";
import type { NavSection } from "@/content/types";

const THEME_STORAGE_KEY = "theme-preference";

type SiteHeaderProps = {
  sections: NavSection[];
  siteName: string;
};

export function SiteHeader({ sections, siteName }: SiteHeaderProps) {
  const { trackId, setTrackId, tracks } = useTrackContext();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "hero");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  useEffect(() => {
    const observedSections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (observedSections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-40% 0px -45% 0px"
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#hero"
            className="text-sm font-semibold tracking-wide text-[var(--text)] transition-colors hover:text-[var(--accent)]"
          >
            {siteName}
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? "bg-[var(--accent-soft)] text-[var(--text)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>

        <div className="inline-flex w-full flex-wrap gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
          {tracks.map((track) => {
            const isActive = track.id === trackId;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setTrackId(track.id)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${
                  isActive
                    ? "border border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
                }`}
              >
                {track.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
