"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const text = "Combining logic with aesthetics. As a Full-Stack Developer and Designer, I build architecture that scales and interfaces that captivate. Every pixel has a purpose; every line of code tells a story.";

export default function ScrollAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"], // Animation plays as this element moves from 80% to 50% of viewport
  });

  const words = text.split(" ");

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen flex items-center justify-center px-6 py-20 bg-[#0a0a0a]"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center text-center gap-x-3 gap-y-2">
        {words.map((word, i) => {
          // Calculate when each word should start and end its transition
          const start = i / words.length;
          const end = start + (1 / words.length);
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const color = useTransform(scrollYProgress, [start, end], ["#333333", "#ffffff"]);
          
          return (
            <motion.span
              key={i}
              style={{ color }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed tracking-tight"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
}
