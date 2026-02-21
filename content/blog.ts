import type { BlogPost } from "@/content/types";

export const blogPosts: BlogPost[] = [];

export function getSortedBlogPosts() {
  return [...blogPosts].sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime();
    const bTime = new Date(b.publishedAt).getTime();
    return bTime - aTime;
  });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
