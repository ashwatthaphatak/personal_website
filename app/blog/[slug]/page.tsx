import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPostBySlug, blogPosts } from "@/content/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Ashwattha Phatak"
    };
  }

  return {
    title: `${post.title} | Ashwattha Phatak`,
    description: post.summary
  };
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      <article className="section-card">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--text)] sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-base leading-8 text-[var(--muted)]">{post.summary}</p>

        <div className="mt-6 space-y-4">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-[var(--text)]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
