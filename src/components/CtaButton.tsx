"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useId } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  href?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "lg";
  type?: "button" | "submit";
  className?: string;
};

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/*
 * Liquid-carve hover: a blob tracks the cursor and eats a gooey hole through
 * the button's fill, revealing a second color underneath. Ported from an
 * Originkit component (Framer marketplace) — same SVG mask + goo-filter
 * technique, but re-plumbed to this button's own variant/size system rather
 * than the original's fixed 40px-font demo defaults, which would look
 * broken at this button's real (much smaller) size.
 *
 * Mechanism: two full-size rounded rects, both pushed through a
 * blur+threshold ("goo") filter. The back one is a flat fill in the reveal
 * color. The front one is the button's own fill color, masked by a circle
 * that follows the pointer and scales in on hover — carving a hole with
 * soft, gooey shoulders where the bite meets the pill's rounded edge.
 *
 * The pointer handlers live on the WRAPPER (the <a>/<button>), not on the
 * SVG: the text/icon layer is a sibling of the SVG, painted on top of it,
 * so a hover landing on the text would never reach a handler attached to
 * the SVG itself — events bubble up the DOM tree, not sideways to siblings.
 *
 * The follow/squash transforms are written directly to element.style on
 * every animation frame (a plain rAF loop, not framer-motion) — they need
 * per-frame numeric control that a declarative animation library fights.
 * The bite's open/close, by contrast, is a single two-state toggle, so it's
 * a native CSS transition instead: simpler, and sidesteps a real bug found
 * here — framer-motion's imperative animate() targeting a raw (non-motion)
 * SVG <g> silently stalled a few percent into the tween instead of
 * completing, independent of anything else this component does.
 */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GOO_STRENGTH = 5;
const FOLLOW_TAU_MIN = 0.02;
const FOLLOW_TAU_MAX = 0.4;
const SMOOTHNESS = 45; // 0-100, higher = the blob lags/settles more
const SQUASH_TAU = 0.09;
const SQUASH_PER_PX_PER_SEC = 0.0011;
const SQUASH_MAX = 1.6;
const BITE_TRANSITION_MS = 500;
const BITE_EASE = "cubic-bezier(0.44, 0, 0.56, 1)";

// Theme colors (src/app/globals.css) baked in directly, not read at runtime —
// this component only ever renders on this site's own dark/gold theme.
const PALETTE = {
  solid: { fill: "#d4af37" /* gold */, reveal: "#1a1a1a" /* dark-primary */ },
  outline: { fill: "#2a2a2a" /* dark-secondary */, reveal: "#d4af37" /* gold */ },
} as const;

function useLiquidCarve() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const followRef = useRef<SVGGElement>(null);
  const squashRef = useRef<SVGGElement>(null);
  const biteRef = useRef<SVGGElement>(null);
  const hovered = useRef(false);
  const chase = useRef({ x: 0, y: 0, tx: 0, ty: 0, squash: 1, angle: 0 });
  const reducedMotion = useReducedMotion();

  const rawId = useId();
  const uid = rawId.replace(/[:]/g, "");
  const filterId = `goo-${uid}`;
  const maskId = `bite-${uid}`;

  // Callback ref so it works across the three element types (Link/a/button)
  // CtaButton can render — a plain useRef wouldn't get reattached when the
  // rendered element type changes between renders.
  const setWrapper = useCallback((el: HTMLElement | null) => {
    wrapperRef.current = el;
  }, []);

  useIsoLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const read = () =>
      setBox((prev) =>
        prev.w === el.offsetWidth && prev.h === el.offsetHeight
          ? prev
          : { w: el.offsetWidth, h: el.offsetHeight }
      );
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
    // Ref callbacks run before layout effects in the same commit, so
    // wrapperRef.current is already set the first time this runs.
  }, []);

  const rad = Math.floor(Math.min(box.w, box.h) / 2); // full pill cap
  // scaled to the button's own short side, not a fixed px demo default, so
  // the bite reads the same proportion on the sm and lg sizes alike
  const blob = Math.max(16, Math.floor(Math.min(box.w, box.h) * 1.3));

  // The bite starts with no inline transform at all, which paints at the
  // browser's default (fully visible) scale — force it closed the instant
  // real dimensions are known, before the first hover.
  useIsoLayoutEffect(() => {
    if (biteRef.current) biteRef.current.style.transform = "scale(0)";
  }, [blob, rad]);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let last = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      const st = chase.current;
      const t = SMOOTHNESS / 100;
      const tau = FOLLOW_TAU_MIN + t * (FOLLOW_TAU_MAX - FOLLOW_TAU_MIN);
      const k = 1 - Math.exp(-dt / tau);
      const dx = (st.tx - st.x) * k;
      const dy = (st.ty - st.y) * k;
      st.x += dx;
      st.y += dy;

      const speed = Math.hypot(dx, dy) / dt;
      const want = Math.min(SQUASH_MAX, 1 + speed * SQUASH_PER_PX_PER_SEC);
      st.squash += (want - st.squash) * (1 - Math.exp(-dt / SQUASH_TAU));
      if (speed > 8) st.angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      if (followRef.current) {
        followRef.current.style.transform = `translate(${st.x}px, ${st.y}px)`;
      }
      if (squashRef.current) {
        squashRef.current.style.transform = `rotate(${st.angle}deg) scale(${st.squash}, ${1 / st.squash})`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const offset = (e: React.PointerEvent) => {
    const el = wrapperRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - (r.top + r.height / 2) };
  };

  const onPointerEnter = (e: React.PointerEvent) => {
    if (reducedMotion || !biteRef.current) return;
    hovered.current = true;
    const o = offset(e);
    if (o) {
      chase.current.tx = o.dx;
      chase.current.ty = o.dy;
      chase.current.x = o.dx;
      chase.current.y = o.dy;
      if (followRef.current) followRef.current.style.transform = `translate(${o.dx}px, ${o.dy}px)`;
    }
    biteRef.current.style.transition = `transform ${BITE_TRANSITION_MS}ms ${BITE_EASE}`;
    biteRef.current.style.transform = "scale(1)";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (reducedMotion || !hovered.current) return;
    const o = offset(e);
    if (o) {
      chase.current.tx = o.dx;
      chase.current.ty = o.dy;
    }
  };

  const onPointerLeave = () => {
    hovered.current = false;
    if (biteRef.current) {
      biteRef.current.style.transition = `transform ${BITE_TRANSITION_MS}ms ${BITE_EASE}`;
      biteRef.current.style.transform = "scale(0)";
    }
  };

  return {
    setWrapper,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
    followRef,
    squashRef,
    biteRef,
    rad,
    blob,
    filterId,
    maskId,
  };
}

function GooBackground({
  variant,
  followRef,
  squashRef,
  biteRef,
  rad,
  blob,
  filterId,
  maskId,
}: {
  variant: "solid" | "outline";
  followRef: React.RefObject<SVGGElement | null>;
  squashRef: React.RefObject<SVGGElement | null>;
  biteRef: React.RefObject<SVGGElement | null>;
  rad: number;
  blob: number;
  filterId: string;
  maskId: string;
}) {
  const { fill, reveal } = PALETTE[variant];

  return (
    <svg
      aria-hidden
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={GOO_STRENGTH} result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" />
        </filter>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
          <g ref={followRef} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <g ref={squashRef} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <g ref={biteRef} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <circle cx="50%" cy="50%" r={blob / 2} fill="#000" />
              </g>
            </g>
          </g>
        </mask>
      </defs>

      <g filter={`url(#${filterId})`}>
        <rect x="0" y="0" width="100%" height="100%" rx={rad} ry={rad} fill={reveal} />
      </g>
      <g filter={`url(#${filterId})`}>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={rad}
          ry={rad}
          fill={fill}
          mask={`url(#${maskId})`}
        />
      </g>
    </svg>
  );
}

export default function CtaButton({
  href,
  onClick,
  children,
  variant = "solid",
  size = "lg",
  type,
  className = "",
}: Props) {
  const { setWrapper, handlers, followRef, squashRef, biteRef, rad, blob, filterId, maskId } =
    useLiquidCarve();

  const sizing = size === "sm" ? "py-1.5 pl-5 pr-1.5 text-sm" : "py-2 pl-7 pr-2 text-sm";
  const iconSizing = size === "sm" ? "h-6 w-6" : "h-8 w-8";

  const textPalette = variant === "solid" ? "text-dark-primary" : "text-white";
  const iconPalette =
    variant === "solid" ? "bg-dark-primary/15 text-dark-primary" : "bg-white/10 text-current";

  const inner = (
    <>
      <GooBackground
        variant={variant}
        followRef={followRef}
        squashRef={squashRef}
        biteRef={biteRef}
        rad={rad}
        blob={blob}
        filterId={filterId}
        maskId={maskId}
      />
      <span className="relative z-10 font-semibold">{children}</span>
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${EASE} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${iconSizing} ${iconPalette}`}
      >
        <ArrowUpRight size={size === "sm" ? 13 : 15} weight="bold" />
      </span>
    </>
  );

  const classes = `group relative inline-flex items-center gap-3 rounded-full transition-transform duration-300 ${EASE} active:scale-[0.98] ${sizing} ${textPalette} ${className}`;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={classes} ref={setWrapper} {...handlers}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} ref={setWrapper} {...handlers}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={classes}
      ref={setWrapper}
      {...handlers}
    >
      {inner}
    </button>
  );
}
