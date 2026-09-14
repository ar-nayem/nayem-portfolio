import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailView from "@/components/ProjectDetailView";
import { getWorkItems, getWorkItem } from "@/lib/cms";

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getWorkItems();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getWorkItem(slug);

  if (!project) {
    return { title: "Project Not Found | MD Aminur Rahman Nayem" };
  }

  return {
    title: `${project.title} | MD Aminur Rahman Nayem`,
    description: project.description,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = await getWorkItem(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
