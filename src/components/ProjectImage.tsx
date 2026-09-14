"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "@phosphor-icons/react";

export default function ProjectImage({
  src,
  alt,
  sizes,
  priority,
  imgClassName = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--color-dark-secondary),var(--color-dark-primary))] text-gold/40">
        <ImageIcon size={40} weight="thin" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={imgClassName}
      onError={() => setFailed(true)}
      // These come from a separate app (the dashboard) on the same domain,
      // not this app's own /public — Next's optimizer would try to fetch
      // them through ITS OWN server and 404. Skip optimization entirely.
      unoptimized
    />
  );
}
