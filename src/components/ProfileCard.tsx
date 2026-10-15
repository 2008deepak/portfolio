"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────
 *  ProfileCard
 *
 *  A premium 3D parallax-tilt card with:
 *   • Mouse-tracked rotateX / rotateY via Framer Motion springs
 *   • B&W → full-color image reveal on hover
 *   • A glass glare radial-gradient that follows the cursor
 * ────────────────────────────────────────────────────────────────────── */

const SPRING_CONFIG = { stiffness: 150, damping: 20, mass: 0.5 };

export default function ProfileCard() {
  /* ── raw mouse tracking ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* ── smoothed springs for tilt ── */
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  /* ── map 0-1 mouse → rotation (max ~12°) ── */
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);
  const rotateX = useTransform(springY, [0, 1], [12, -12]);

  /* ── glare gradient position ── */
  const glareX = useTransform(springX, [0, 1], [0, 100]);
  const glareY = useTransform(springY, [0, 1], [0, 100]);

  /* ── handlers ── */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-sm rounded-3xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } }}
    >
      {/* ── Perspective wrapper ── */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden rounded-3xl"
        style={{ perspective: 800 }}
      >
        {/* ── Portrait image ── */}
        <Image
          src="/deepak.jpeg"
          alt="Deepak Dattatray Shevkar"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover transition-all duration-700 ease-out grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
          priority
        />

        {/* ── Glass glare overlay ── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)`
            ),
          }}
        />

        {/* ── Bottom gradient fade for text legibility ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* ── Name + role overlay ── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
          style={{ transform: "translateZ(30px)" }}
        >
          <h3 className="text-xl font-bold text-white tracking-tight">
            Deepak Shevkar
          </h3>
          <p className="text-xs text-white/60 mt-1 tracking-wide uppercase">
            Full-Stack Developer & Designer
          </p>
        </div>
      </div>
    </motion.div>
  );
}
