import type { Metadata } from "next";
import ProjectsView from "@/components/ProjectsView";
import { getRepos } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects | MD Aminur Rahman Nayem",
  description:
    "Every shipped codebase — marketplaces, SaaS platforms, and personal tools, built end to end and deployed on my own infrastructure.",
};

export default async function ProjectsPage() {
  const items = await getRepos();
  return <ProjectsView items={items} />;
}
