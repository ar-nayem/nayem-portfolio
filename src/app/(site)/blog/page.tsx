import type { Metadata } from "next";
import BlogListView from "@/components/BlogListView";
import { getBlogPosts } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | MD Aminur Rahman Nayem",
  description: "Writing on project management, operations, and cross-border work.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  return <BlogListView posts={posts} />;
}
