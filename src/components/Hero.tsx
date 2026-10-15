"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TAGLINE_PARTS = [
  "Full-Stack Developer,",
  "Graphic Designer,",
  "& Video Editor.",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax & fade as user scrolls out of hero
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.7], ["0%", "25%"]);

  // Staggered letters for the name
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };

  const letterVariants = {
    hidden:  { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
      aria-label="Hero"
    >
      {/* Scroll-linked wrapper with Mix Blend Mode Difference */}
      <motion.div
        style={{ opacity, y: translateY }}
        className="relative z-50 max-w-5xl w-full mix-blend-difference pointer-events-none text-white"
      >
        {/* Name with Letter-by-Letter Slide Down */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 pointer-events-auto"
        >
          {["Deepak", "Dattatray", "Shevkar"].map((word, wordIndex) => (
            <div key={wordIndex} className="flex overflow-hidden">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterVariants}
                  className="block text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Tagline fading in after the name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-8 space-y-2 pointer-events-auto"
        >
          <p className="text-[clamp(1rem,2.4vw,1.4rem)] font-medium leading-relaxed opacity-90">
            {TAGLINE_PARTS.map((part, i) => (
              <span key={i} className="mr-1">
                {part}
              </span>
            ))}
          </p>
          <p className="text-[clamp(0.85rem,1.6vw,1.05rem)] max-w-2xl mx-auto mt-3 opacity-70">
            I don&apos;t just write code; I craft complete digital experiences.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#444]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
