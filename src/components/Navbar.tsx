"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 border-b border-white/8 backdrop-blur-xl bg-[#0a0a0a]/70"
          : "py-5 bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          id="nav-logo"
          className="text-sm font-bold tracking-[0.12em] uppercase text-white"
          aria-label="Back to top"
        >
          DS.
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#bento"
            id="nav-work-link"
            className="text-xs tracking-widest uppercase text-[#666]"
          >
            Work
          </a>
          <a
            href="mailto:your-email@example.com"
            id="nav-contact-link"
            className="text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/12 text-[#888]"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
