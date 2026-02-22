"use client";

import { useMemo } from "react";

import { TrackSwitcher } from "@/components/track-switcher";
import { useTrackContext } from "@/components/track-context";
import type { SkillGroup } from "@/content/types";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

export function SkillsSection({ groups }: SkillsSectionProps) {
  const { activeTrack } = useTrackContext();

  const orderedGroups = useMemo(() => {
    const order = new Map(activeTrack.skillOrder.map((id, index) => [id, index]));

    return [...groups].sort((a, b) => {
      const aOrder = order.get(a.id) ?? Number.POSITIVE_INFINITY;
      const bOrder = order.get(b.id) ?? Number.POSITIVE_INFINITY;
      return aOrder - bOrder;
    });
  }, [activeTrack.skillOrder, groups]);

  const maxGroupItems = useMemo(
    () => groups.reduce((maximum, group) => Math.max(maximum, group.items.length), 1),
    [groups]
  );

  return (
    <section id="skills" className="section-shell">
      <div className="section-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">Technical Skills</h2>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
              Focus Track
            </span>
            <TrackSwitcher compact />
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orderedGroups.map((group) => {
            const highlighted = activeTrack.highlightSkillGroups.includes(group.id);
            const fillPercentage = Math.max(24, Math.round((group.items.length / maxGroupItems) * 100));

            return (
              <article
                key={group.id}
                className={`interactive-card rounded-2xl border p-4 transition ${
                  highlighted
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[var(--button-shadow)]"
                    : "border-[var(--border)] bg-[var(--surface-strong)]"
                }`}
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[var(--text)]">{group.title}</h3>
                <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--surface)]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      highlighted ? "bg-[var(--text)]" : "bg-[var(--accent)]"
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
