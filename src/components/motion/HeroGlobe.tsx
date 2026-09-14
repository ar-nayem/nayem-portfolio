"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export default function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const gold = new THREE.Color("#d4af37");

    const wireGeometry = new THREE.WireframeGeometry(
      new THREE.IcosahedronGeometry(2, 2)
    );
    const wireMaterial = new THREE.LineBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.35,
    });
    const wireGlobe = new THREE.LineSegments(wireGeometry, wireMaterial);
    scene.add(wireGlobe);

    const dotsGeometry = new THREE.IcosahedronGeometry(2.05, 3);
    const dotsMaterial = new THREE.PointsMaterial({
      color: gold,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    scene.add(dots);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 0.4;
      targetTiltX = ny * -0.4;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let frameId = 0;
    const animate = () => {
      wireGlobe.rotation.y += 0.0018;
      dots.rotation.y += 0.0018;

      tiltX += (targetTiltX - tiltX) * 0.05;
      tiltY += (targetTiltY - tiltY) * 0.05;
      wireGlobe.rotation.x = tiltX;
      dots.rotation.x = tiltX;
      wireGlobe.rotation.z = tiltY * 0.3;
      dots.rotation.z = tiltY * 0.3;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      wireGeometry.dispose();
      wireMaterial.dispose();
      dotsGeometry.dispose();
      dotsMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  );
}
