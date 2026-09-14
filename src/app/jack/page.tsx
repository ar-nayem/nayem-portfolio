import type { Metadata } from "next";
import HeroSection from "@/components/jack/HeroSection";
import MarqueeSection from "@/components/jack/MarqueeSection";
import AboutSection from "@/components/jack/AboutSection";
import ServicesSection from "@/components/jack/ServicesSection";
import ProjectsSection from "@/components/jack/ProjectsSection";
import PhotographySection from "@/components/jack/PhotographySection";
import { getWorkItems } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nayem -- Project Manager",
};

export default async function JackPage() {
  const workItems = await getWorkItems();

  return (
    <div style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection items={workItems} />
      <PhotographySection />
    </div>
  );
}
