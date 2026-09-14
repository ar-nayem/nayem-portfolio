import FadeIn from "./FadeIn";
import SphereGallery3D from "../SphereGallery3D";
import { getPhotographyMedia } from "@/lib/media";

export default async function PhotographySection() {
  const media = await getPhotographyMedia();

  return (
    <section
      id="photography"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Photography
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto h-[480px] max-w-5xl overflow-hidden rounded-[24px] sm:h-[560px] md:h-[640px]">
          <SphereGallery3D background="#0C0C0C" images={media} />
        </div>
      </FadeIn>
    </section>
  );
}
