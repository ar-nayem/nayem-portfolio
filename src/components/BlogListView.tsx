"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectImage from "./ProjectImage";
import type { BlogPost } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function BlogListView({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="pt-40 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <span className="mb-3 inline-block rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            Blog
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Writing</h1>
        </motion.div>

        {posts.length === 0 && (
          <p className="text-text-muted">No posts published yet — check back soon.</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
            >
              <Link
                href={`/blog/${post.slug}`}
                data-cursor="Read"
                className="group block rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-gold/30"
              >
                <div className="overflow-hidden rounded-[1.625rem] bg-dark-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-primary">
                    <ProjectImage
                      src={post.coverImage}
                      alt={post.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      imgClassName="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold">
                      {new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-lg font-bold text-white transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
