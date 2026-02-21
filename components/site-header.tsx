"use client";

import { useEffect, useMemo, useState } from "react";

import type { NavSection } from "@/content/types";

const THEME_STORAGE_KEY = "theme-preference";

type SiteHeaderProps = {
  sections: NavSection[];
  siteName: string;
};

export function SiteHeader({ sections, siteName }: SiteHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "hero");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  useEffect(() => {
    const observedSections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (observedSections.length === 0) {
      return;
    }

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      const markerY = window.scrollY + 190;
      let nextActiveId = observedSections[0].id;

      for (const section of observedSections) {
        if (section.offsetTop <= markerY) {
          nextActiveId = section.id;
        } else {
          break;
        }
      }

      const isAtPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        nextActiveId = observedSections[observedSections.length - 1].id;
      }

      setActiveSection((currentId) => (currentId === nextActiveId ? currentId : nextActiveId));
    };

    const queueUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateActiveSection);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    window.addEventListener("hashchange", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.removeEventListener("hashchange", queueUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <a
            href="#hero"
            onClick={() => setActiveSection("hero")}
            className={`rounded-full px-3 py-1.5 transition ${
              activeSection === "hero"
                ? "bg-[var(--accent-soft)] text-[var(--text)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
            }`}
          >
            {siteName}
          </a>
          {sections.filter((section) => section.id !== "hero").map((section) => {
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
