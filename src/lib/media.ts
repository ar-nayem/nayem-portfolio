import type { GalleryItem } from "@/components/SphereGallery3D";

// The dashboard (arnayem.top/dashboard) owns the actual pictures — this app
// only displays whatever it publishes at /api/media. Same domain in
// production, so the URLs it returns are root-relative and just work as-is
// in an <img>/GL texture src on this site too.
const MEDIA_API_URL = process.env.MEDIA_API_URL ?? "https://arnayem.top/dashboard/api/media";

export async function getPhotographyMedia(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(MEDIA_API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];

    const data: unknown = await res.json();
    const images = (data as { images?: unknown } | null)?.images;
    if (!Array.isArray(images)) return [];

    return images
      .map((entry): GalleryItem | null => {
        if (typeof entry !== "object" || entry === null) return null;
        const { image, link } = entry as { image?: unknown; link?: unknown };
        if (typeof image !== "string" || !image) return null;
        return { image, link: typeof link === "string" ? link : "" };
      })
      .filter((item): item is GalleryItem => item !== null);
  } catch {
    // dashboard unreachable (down, DNS, local dev) — the gallery falls back
    // to SphereGallery3D's own placeholder images
    return [];
  }
}
