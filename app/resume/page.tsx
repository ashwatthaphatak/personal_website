import Link from "next/link";
import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Resume Hub | Ashwattha Phatak",
  description: "View and print Ashwattha Phatak's resume variants."
};

function stripDownloadPrefix(label: string) {
  return label.replace(/^download\s+/i, "").trim();
}

export default function ResumeHubPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <section className="section-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Resume Hub</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--text)] sm:text-4xl">{profile.name}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Both resume variants are available below. Open any one and use Print.
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--text)]">
              If you&apos;re hiring for Distributed/Systems, use Resume A (Distributed Resume); if
              Autonomy/Perception, use Resume B (ML/AI Resume).
            </p>
          </div>
          <Link
            href="/#hero"
            className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            Back to Portfolio
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-6">
        {profile.links.resumes.map((resume) => (
          <section key={resume.href} className="section-card">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-[var(--text)] sm:text-2xl">
                {stripDownloadPrefix(resume.label)}
              </h2>
              <a
                href={resume.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text)] transition hover:border-[var(--text)]"
              >
                Print
              </a>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)] bg-white">
              <iframe
                title={`${resume.label} preview`}
                src={resume.href}
                className="h-[80vh] w-full"
              />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
