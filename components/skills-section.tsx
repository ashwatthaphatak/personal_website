"use client";

import { useMemo } from "react";

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

  return (
    <section id="skills" className="scroll-mt-40 py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[var(--text)]">Technical Skills</h2>
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
          {activeTrack.label}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orderedGroups.map((group) => {
          const highlighted = activeTrack.highlightSkillGroups.includes(group.id);

          return (
            <article
              key={group.id}
              className={`rounded-xl border p-4 transition ${
                highlighted
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              <h3 className="text-base font-semibold text-[var(--text)]">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2 py-1 text-xs text-[var(--muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
