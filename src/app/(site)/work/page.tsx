import type { Metadata } from "next";
import WorkIndexView from "@/components/WorkIndexView";
import { getWorkItems } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Selected Work | MD Aminur Rahman Nayem",
  description:
    "Project management and international operations work by MD Aminur Rahman Nayem, spanning supply chain, vendor coordination, and process design.",
};

export default async function WorkPage() {
  const items = await getWorkItems();
  return <WorkIndexView items={items} />;
}
