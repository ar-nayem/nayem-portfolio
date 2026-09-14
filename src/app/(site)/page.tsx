import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Photography from "@/components/Photography";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { getPhotographyMedia } from "@/lib/media";
import { getWorkItems, getServices, getFaqs } from "@/lib/cms";

export const revalidate = 300;

export default async function Home() {
  const [media, workItems, services, faqs] = await Promise.all([
    getPhotographyMedia(),
    getWorkItems(),
    getServices(),
    getFaqs(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Work items={workItems} />
      <Photography images={media} />
      <Services items={services} />
      <FAQ items={faqs} />
      <Contact />
    </>
  );
}
