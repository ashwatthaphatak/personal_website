"use client";

import { useEffect, useMemo, useState } from "react";

import { useBootSequence } from "@/components/boot-sequence";
import type { NavSection } from "@/content/types";

const THEME_STORAGE_KEY = "theme-preference";

type SiteHeaderProps = {
  sections: NavSection[];
  siteName: string;
};

export function SiteHeader({ sections, siteName }: SiteHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "hero");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { reboot, isBooting } = useBootSequence();

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

  const setThemePreference = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/70 bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] p-2 shadow-[var(--panel-shadow)]">
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap pr-1 text-xs sm:text-sm">
            <a
              href="#hero"
              onClick={() => setActiveSection("hero")}
              className={`rounded-xl px-3 py-2 transition ${
                activeSection === "hero"
                  ? "bg-[var(--text)] text-[var(--bg)] shadow-[var(--button-shadow)]"
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
                  className={`rounded-xl px-3 py-2 transition ${
                    isActive
                      ? "bg-[var(--text)] text-[var(--bg)] shadow-[var(--button-shadow)]"
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
              onClick={reboot}
              disabled={isBooting}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)] disabled:opacity-50"
              aria-label="Reboot website"
              title="Reboot website"
            >
              <PowerIcon />
            </button>
            <div
              className="inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1"
              role="group"
              aria-label="Theme toggle"
            >
              <button
                type="button"
                onClick={() => setThemePreference("light")}
                className={`rounded-lg p-2 transition ${
                  theme === "light"
                    ? "bg-[var(--text)] text-[var(--bg)] shadow-[var(--button-shadow)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
                }`}
                aria-label="Switch to light mode"
                title="Light mode"
              >
                <SunIcon />
              </button>
              <button
                type="button"
                onClick={() => setThemePreference("dark")}
                className={`rounded-lg p-2 transition ${
                  theme === "dark"
                    ? "bg-[var(--text)] text-[var(--bg)] shadow-[var(--button-shadow)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
                }`}
                aria-label="Switch to dark mode"
                title="Dark mode"
              >
                <MoonIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.8 4.8l1.6 1.6M17.6 17.6l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.8 19.2l1.6-1.6M17.6 6.4l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.8a8.2 8.2 0 1 1-10.8-10.7A7.1 7.1 0 0 0 20 14.8Z" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 3.1v8.1" />
      <path d="M17.7 5.8a8 8 0 1 1-11.4 0" />
    </svg>
  );
}
