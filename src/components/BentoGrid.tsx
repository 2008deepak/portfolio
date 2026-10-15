"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Mail, ArrowUpRight, Mic, Hand, Brain, Monitor, ShieldCheck, Phone } from "lucide-react";
import MagneticElement from "@/components/MagneticElement";

/* ─── Shared SVG Icons ──────────────────────────────────────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Shared animation helpers ──────────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    hidden:  { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

/* ─── Tech Marquee ───────────────────────────────────────────────────── */
const SKILLS = [
  "Python", "C++", "C", "JavaScript", "AI Integration",
  "React", "Next.js", "TypeScript", "Framer Motion", "Node.js",
];

function TechMarquee() {
  // Duplicate for seamless loop
  const items = [...SKILLS, ...SKILLS];
  return (
    <div className="marquee-track overflow-hidden w-full py-1" aria-label="Tech stack marquee">
      <div className="animate-marquee gap-3" style={{ display: "flex" }}>
        {items.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-[#a0aec0] whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Project Card ───────────────────────────────────────────────────── */
interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  delay: number;
}

function ProjectCard({ number, title, description, tags, gradient, delay }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="glass-card relative overflow-hidden flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md h-full"
    >
      {/* Thumbnail placeholder */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-xl"
        style={{ background: gradient }}
      >
        {/* Project number watermark */}
        <span className="absolute bottom-4 right-5 text-[6rem] font-black leading-none text-white/5 select-none pointer-events-none">
          {number}
        </span>
        {/* Corner arrow */}
        <span className="absolute top-4 right-4">
          <ArrowUpRight className="w-5 h-5 text-white/60" />
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <p className="text-sm text-[#777] leading-relaxed mt-2 flex-1">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pt-1 mt-auto">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold tracking-widest uppercase text-[#63b3ed] border border-[#63b3ed]/20 bg-[#63b3ed]/5 px-2.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Bento Grid ─────────────────────────────────────────────────────── */
export default function BentoGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="bento"
      className="relative w-full flex justify-center px-6 py-20"
      aria-label="Projects and info"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section heading */}
        <div ref={headerRef} className="mb-12 text-center">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="text-xs tracking-[0.22em] uppercase text-[#555] mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tighter"
          >
            What I&apos;ve Built
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {/* ── Box 1 — Nexus Project (col-span 2) ── */}
          <div className="lg:col-span-2 flex flex-col justify-center pr-8">
            <NexusCard />
          </div>

          {/* ── Box 2 — Tech Stack (col-span 1) ── */}
          <TechBox />

          {/* ── Box 3 — Project Title 2 (col-span 2) ── */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <ProjectCard
              number="02"
              title="Project Title 2"
              description="An immersive multimedia brand identity project — spanning a full motion graphics package, custom typeface design, and a responsive marketing site. Designed end-to-end from concept to delivery."
              tags={["Branding", "Motion", "React", "After Effects"]}
              gradient="linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #4a1278 100%)"
              delay={0.05}
            />
          </div>

          {/* ── Box 4 — Contact (col-span 1) ── */}
          <ContactBox />
        </div>
      </div>
    </section>
  );
}

/* ─── Nexus Project Card ────────────────────────────────────────────── */
const NEXUS_FEATURES = [
  { Icon: Mic,         label: "Voice Control",        sub: "Wake word & commands" },
  { Icon: Hand,        label: "Smart Mouse",           sub: "Webcam gesture tracking" },
  { Icon: Brain,       label: "AI Brain",              sub: "Llama-3.3-70b via Groq" },
  { Icon: Monitor,     label: "Custom HUD",            sub: "Live stats & subtitles" },
  { Icon: ShieldCheck, label: "Safety Kill Switch",    sub: "System automation & ESC" },
];

const NEXUS_TAGS = ["Python", "Groq API", "Computer Vision", "Tkinter"];

function NexusCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="glass-card relative overflow-hidden flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md h-full"
      aria-label="Project: Nexus — Personal Desktop AI Assistant"
    >
      {/* ── Hero image ── */}
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
          alt="Futuristic glowing blue holographic interface"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          unoptimized
        />
        {/* Dark gradient overlay so text beneath reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

        {/* Project number watermark */}
        <span className="absolute bottom-3 right-5 text-[5.5rem] font-black leading-none text-white/5 select-none pointer-events-none">
          01
        </span>

        {/* Corner arrow — appears on hover */}
        <span className="absolute top-4 right-4">
          <ArrowUpRight className="w-5 h-5 text-white/70" />
        </span>

        {/* Live badge */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#63b3ed]/30 bg-[#0a0a0a]/60 backdrop-blur-sm text-[10px] font-semibold tracking-widest uppercase text-[#63b3ed]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#63b3ed] animate-pulse" />
          Python Project
        </span>
      </div>

      {/* ── Content area ── */}
      <div className="p-8 flex flex-col gap-4 flex-1">

        {/* Title + subtitle */}
        <div>
          <h3 className="text-xl font-black text-white tracking-tight leading-tight">
            Nexus
          </h3>
          <p className="text-sm font-medium text-[#63b3ed] mt-1">
            Personal Desktop AI Assistant
          </p>
          <p className="mt-3 text-sm text-[#777] leading-relaxed">
            A &quot;zero-touch&quot; voice and gesture-controlled desktop assistant inspired by
            J.A.R.V.I.S., built entirely in Python.
          </p>
        </div>

        {/* Feature list */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list" aria-label="Key capabilities">
          {NEXUS_FEATURES.map(({ Icon, label, sub }) => (
            <li
              key={label}
              className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.03] px-4 py-3"
            >
              <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#63b3ed]/10 border border-[#63b3ed]/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#63b3ed]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-white/90">{label}</span>
                <span className="block text-[11px] text-[#666] mt-0.5">{sub}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Tech stack pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-3 mt-auto border-t border-white/5">
          {NEXUS_TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-widest uppercase text-[#63b3ed] border border-[#63b3ed]/20 bg-[#63b3ed]/5 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Tech Stack Box ─────────────────────────────────────────────────── */

function TechBox() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0.08)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="glass-card relative overflow-hidden flex flex-col justify-center p-8 min-h-[280px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md h-full"
    >
      {/* Accent blob */}
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.12)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="mb-4 text-center">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#555] mb-1">Arsenal</p>
        <h3 className="text-lg font-bold text-white">Tech Stack</h3>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center overflow-hidden">
        <TechMarquee />
        {/* Second row offset */}
        <div className="relative overflow-hidden w-full">
          <div
            className="flex gap-3"
            style={{
              transform: "translateX(-40px)",
              animation: "marquee 22s linear infinite reverse",
              width: "max-content",
            }}
          >
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-4 py-1.5 rounded-full border border-white/8 bg-white/3 text-xs font-medium tracking-widest uppercase text-[#606060] whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-[10px] tracking-widest uppercase text-[#444] mt-auto pt-2 text-center">
        & always learning more
      </div>
    </motion.div>
  );
}

/* ─── Contact Box ────────────────────────────────────────────────────── */
function ContactBox() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const CONTACT_LINKS = [
    { href: "mailto:deepakshevkar2008@gmail.com", label: "deepakshevkar2008@gmail.com", Icon: Mail },
    { href: "https://www.linkedin.com/in/deepak-shevkar", label: "LinkedIn Profile", Icon: LinkedinIcon },
    { href: "https://github.com/2008deepak", label: "GitHub Profile", Icon: GithubIcon },
    { href: "tel:+918329835535", label: "+91 83298 35535", Icon: Phone },
  ];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0.12)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="glass-card relative overflow-hidden flex flex-col min-h-[280px] p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md h-full"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-black text-white tracking-tight">Get in Touch</h3>
        <p className="text-xs text-[#777] mt-1">Let&apos;s build something great together.</p>
      </div>

      <ul className="flex flex-col gap-4 flex-1 justify-center">
        {CONTACT_LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            <MagneticElement>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#888]" />
                </div>
                <span className="text-sm font-medium text-[#ccc]">
                  {label}
                </span>
              </a>
            </MagneticElement>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
