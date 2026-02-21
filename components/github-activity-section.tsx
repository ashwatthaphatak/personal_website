type GitHubActivitySectionProps = {
  username: string;
  profileUrl: string;
};

export function GitHubActivitySection({ username, profileUrl }: GitHubActivitySectionProps) {
  const chartUrl = `https://ghchart.rshah.org/ff3047/${username}`;

  return (
    <section id="github-activity" className="section-shell">
      <div className="section-card">
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

        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-2 sm:p-3">
          <img
            src={chartUrl}
            alt={`${username} GitHub contribution chart`}
            className="block h-auto w-[108%] max-w-none -translate-x-[4%] rounded-lg border border-[var(--border)] bg-white p-2"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
