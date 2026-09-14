"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectImage from "./ProjectImage";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogPost } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <section className="pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.7, ease: EASE }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-80 transition-opacity hover:opacity-100"
          >
            ← Blog
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gold">
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{post.title}</h1>
        </motion.div>

        {post.coverImage && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative mt-10 aspect-video w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-secondary"
          >
            <ProjectImage
              src={post.coverImage}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, 800px"
              imgClassName="object-cover"
              priority
            />
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-text-muted [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-2 [&_blockquote]:border-gold/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_hr]:my-8 [&_hr]:border-dark-border [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
        />
      </div>
    </section>
  );
}
