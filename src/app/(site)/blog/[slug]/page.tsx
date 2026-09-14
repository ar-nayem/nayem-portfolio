import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/BlogPostView";
import { getBlogPosts, getBlogPost } from "@/lib/cms";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found | MD Aminur Rahman Nayem" };
  }

  return {
    title: `${post.title} | MD Aminur Rahman Nayem`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
