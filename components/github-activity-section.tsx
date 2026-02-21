"use client";

import { useEffect, useMemo, useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  weekday: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionsPayload = {
  years: number[];
  totalContributions: number;
  maxContributionCount: number;
  weeks: ContributionWeek[];
};

type GitHubActivitySectionProps = {
  username: string;
  profileUrl: string;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function contributionLevel(value: number, max: number) {
  if (value <= 0) {
    return 0;
  }

  const normalized = max > 0 ? value / max : 0;
  if (normalized >= 0.75) {
    return 4;
  }
  if (normalized >= 0.5) {
    return 3;
  }
  if (normalized >= 0.25) {
    return 2;
  }
  return 1;
}

const LEVEL_COLORS = [
  "transparent",
  "rgb(226 43 66 / 0.24)",
  "rgb(226 43 66 / 0.42)",
  "rgb(226 43 66 / 0.64)",
  "rgb(226 43 66 / 0.9)"
];

export function GitHubActivitySection({ username, profileUrl }: GitHubActivitySectionProps) {
  const currentYear = new Date().getUTCFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState<ContributionsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCanceled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github-contributions?username=${encodeURIComponent(username)}&year=${selectedYear}`
        );

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? "Unable to load GitHub contributions.");
        }

        const payload = (await response.json()) as ContributionsPayload;
        if (!isCanceled) {
          setData(payload);
        }
      } catch (requestError) {
        if (!isCanceled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load GitHub contributions.");
          setData(null);
        }
      } finally {
        if (!isCanceled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isCanceled = true;
    };
  }, [selectedYear, username]);

  const years = useMemo(() => {
    if (!data?.years || data.years.length === 0) {
      return [currentYear];
    }
    return data.years;
  }, [currentYear, data?.years]);

  useEffect(() => {
    if (years.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [selectedYear, years]);

  return (
    <section id="github-activity" className="section-shell">
      <div className="section-card">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">GitHub Activity</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Live contribution history from{" "}
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--accent)] underline decoration-transparent underline-offset-2 transition hover:decoration-current"
              >
                @{username}
              </a>
              .
            </p>
          </div>
          <p className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
            {data ? `${formatCount(data.totalContributions)} contributions` : "Loading"}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {years.map((year) => {
            const active = year === selectedYear;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition ${
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-1.5 sm:p-2">
          {isLoading ? (
            <p className="text-sm text-[var(--muted)]">Loading contribution graph...</p>
          ) : null}

          {!isLoading && error ? (
            <p className="text-sm text-[var(--muted)]">
              {error}{" "}
              <a href={profileUrl} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">
                Open GitHub profile
              </a>
            </p>
          ) : null}

          {!isLoading && !error && data ? (
            <div className="overflow-x-auto">
              <div className="inline-flex gap-[2px] rounded-md border border-[var(--border)] bg-[var(--surface)] p-1.5">
                {data.weeks.map((week, weekIndex) => (
                  <div key={`${week.contributionDays[0]?.date ?? "week"}-${weekIndex}`} className="grid grid-rows-7 gap-[2px]">
                    {week.contributionDays.map((day) => {
                      const level = contributionLevel(day.contributionCount, data.maxContributionCount);
                      const label = `${day.date}: ${day.contributionCount} contributions`;

                      return (
                        <span
                          key={day.date}
                          title={label}
                          aria-label={label}
                          className="h-2 w-2 rounded-[2px] border border-black/20"
                          style={{ backgroundColor: LEVEL_COLORS[level] }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
