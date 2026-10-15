"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

/* ──────────────────────────────────────────────────────────────────────
 *  AnimatedScrollLine
 *
 *  A full-page, curvy SVG that "draws" itself as the user scrolls.
 *  Uses cubic Bézier curves for an elegant, meandering path.
 *  Scroll progress → pathLength via Framer Motion.
 * ────────────────────────────────────────────────────────────────────── */

const STROKE_WIDTH = 2;

const CURVE_SEGMENTS = [
  { dx: 110, cy1: 80, cy2: 160 },
  { dx: -200, cy1: 260, cy2: 340 },
  { dx: 160, cy1: 440, cy2: 520 },
  { dx: -180, cy1: 620, cy2: 700 },
  { dx: 140, cy1: 800, cy2: 880 },
  { dx: -220, cy1: 980, cy2: 1060 },
  { dx: 190, cy1: 1160, cy2: 1240 },
  { dx: -160, cy1: 1340, cy2: 1420 },
  { dx: 210, cy1: 1520, cy2: 1600 },
  { dx: -190, cy1: 1700, cy2: 1780 },
  { dx: 170, cy1: 1880, cy2: 1960 },
  { dx: -230, cy1: 2060, cy2: 2140 },
  { dx: 150, cy1: 2240, cy2: 2320 },
  { dx: -200, cy1: 2420, cy2: 2500 },
  { dx: 180, cy1: 2600, cy2: 2680 },
  { dx: -170, cy1: 2780, cy2: 2860 },
  { dx: 220, cy1: 2960, cy2: 3040 },
  { dx: -210, cy1: 3140, cy2: 3220 },
  { dx: 160, cy1: 3320, cy2: 3400 },
  { dx: -180, cy1: 3500, cy2: 3580 },
  { dx: 200, cy1: 3680, cy2: 3760 },
  { dx: -160, cy1: 3860, cy2: 3940 },
  { dx: 190, cy1: 4040, cy2: 4120 },
  { dx: -220, cy1: 4220, cy2: 4300 },
  { dx: 170, cy1: 4400, cy2: 4480 },
  { dx: -200, cy1: 4580, cy2: 4660 },
  { dx: 140, cy1: 4760, cy2: 4840 },
  { dx: -180, cy1: 4940, cy2: 5020 },
];

function buildPath(pageHeight: number): { d: string; svgH: number } {
  const svgH = Math.max(pageHeight + 200, 6000);
  const startX = 180;
  const startY = -40;
  let x = startX;
  let y = startY;

  let d = `M ${x} ${y}`;

  const usable = CURVE_SEGMENTS.length;
  const step = (svgH - 200) / usable;

  for (const seg of CURVE_SEGMENTS) {
    const nextY = y + step;
    const cp1x = x + seg.cy1 * 0.5;
    const cp1y = y + step * 0.35;
    const cp2x = x + seg.cy2 * 0.5;
    const cp2y = y + step * 0.65;
    const nx = x + seg.dx;
    const ny = nextY;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nx} ${ny}`;
    x = nx;
    y = ny;
  }

  const tailLen = 200;
  d += ` C ${x} ${y + tailLen * 0.35}, ${x} ${y + tailLen * 0.65}, ${x} ${y + tailLen}`;

  return { d, svgH };
}

export default function AnimatedScrollLine() {
  const [pageH, setPageH] = useState(0);

  useEffect(() => {
    const measure = () => setPageH(document.body.scrollHeight);
    measure();
    window.addEventListener("resize", measure);
    const id = setInterval(measure, 2000);
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(id);
    };
  }, []);

  const { d, svgH } = useMemo(() => buildPath(pageH), [pageH]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.8,
  });

  if (pageH === 0) return null;

  const vbW = 400;
  const vbH = Math.max(svgH, 6000);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="scroll-line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#63b3ed" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#63b3ed" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#63b3ed" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Static ghost path for depth */}
        <path
          d={d}
          fill="transparent"
          stroke="url(#scroll-line-grad)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Animated drawing path */}
        <motion.path
          d={d}
          fill="transparent"
          stroke="url(#scroll-line-grad)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />
      </svg>
    </div>
  );
}
