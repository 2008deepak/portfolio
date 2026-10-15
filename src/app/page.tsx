"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import ScrollAbout from "@/components/ScrollAbout";

/* ─── SVG Paths ─────────────────────────────────────────────────────── */
const PATH_LEFT = [
  "M 12 0",
  "C 8 15, 18 28, 12 42",
  "C 6 56, 20 70, 14 85",
  "C 9 93, 15 97, 12 100",
].join(" ");

const PATH_CENTER = [
  "M 50 0",
  "C 54 12, 46 25, 51 38",
  "C 56 52, 44 65, 50 78",
  "C 55 88, 47 95, 50 100",
].join(" ");

const PATH_RIGHT = [
  "M 88 0",
  "C 92 18, 84 32, 89 48",
  "C 94 62, 82 76, 87 90",
  "C 90 96, 86 99, 88 100",
].join(" ");

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.5 });

  const len1 = useTransform(smooth, [0, 0.8], [0, 1]);
  const len2 = useTransform(smooth, [0.05, 0.85], [0, 1]);
  const len3 = useTransform(smooth, [0.1, 0.9], [0, 1]);

  return (
    <main ref={ref} className="relative">
      {/* SVG SCROLL PATHS */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path d={PATH_LEFT} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.3" strokeLinecap="round" pathLength="1" style={{ pathLength: len1 }} />
          <motion.path d={PATH_CENTER} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" strokeLinecap="round" pathLength="1" style={{ pathLength: len2 }} />
          <motion.path d={PATH_RIGHT} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.3" strokeLinecap="round" pathLength="1" style={{ pathLength: len3 }} />
        </svg>
      </div>

      <Navbar />
      <Hero />
      <ScrollAbout />
      <BentoGrid />
      <Footer />
    </main>
  );
}
