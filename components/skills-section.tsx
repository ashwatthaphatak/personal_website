import type { SkillColumn } from "@/content/types";

type SkillsSectionProps = {
  columns: SkillColumn[];
};

export function SkillsSection({ columns }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-shell">
      <div className="section-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">Technical Skills</h2>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {columns.map((column) => (
            <article
              key={column.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-3"
            >
              <h3 className="text-base font-semibold text-[var(--text)]">{column.title}</h3>

              <div className="mt-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{column.strongLabel}</p>
                <p className="mt-1 text-sm leading-7 text-[var(--text)]">{column.strong.join(" · ")}</p>
              </div>

              <div className="mt-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{column.familiarLabel}</p>
                <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{column.familiar.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
