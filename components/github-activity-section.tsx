type GitHubActivitySectionProps = {
  username: string;
  profileUrl: string;
};

export function GitHubActivitySection({ username, profileUrl }: GitHubActivitySectionProps) {
  const chartUrl = `https://ghchart.rshah.org/0f766e/${username}`;

  return (
    <section id="github-activity" className="scroll-mt-40 py-8 sm:py-10">
      <h2 className="text-xl font-semibold text-[var(--text)]">GitHub Activity</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Live contribution history from{" "}
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[var(--accent)] transition hover:opacity-80"
        >
          @{username}
        </a>
        .
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <img
          src={chartUrl}
          alt={`${username} GitHub contribution chart`}
          className="min-w-[760px] rounded-md border border-[var(--border)] bg-white p-2"
          loading="lazy"
        />
      </div>
    </section>
  );
}
