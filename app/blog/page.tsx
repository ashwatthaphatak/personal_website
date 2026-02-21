import Link from "next/link";
import type { Metadata } from "next";

import { getSortedBlogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Writing | Ashwattha Phatak",
  description: "Independent writing and blog posts by Ashwattha Phatak."
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function BlogPage() {
  const posts = getSortedBlogPosts();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <section className="section-card">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Writing</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text)] sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          This page is independent from the portfolio sections. Add and edit posts in{" "}
          <code className="rounded bg-[var(--surface)] px-1 py-0.5">content/blog.ts</code>.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            Back to Portfolio
          </Link>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="section-card mt-6">
          <p className="text-sm leading-7 text-[var(--muted)]">No posts published yet.</p>
        </section>
      ) : (
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
            >
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--text)]">{post.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                Read Post
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
