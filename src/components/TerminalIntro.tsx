"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "> System initialization...",
  "> Loading Nexus AI protocols...",
  "> Accessing deepak_portfolio.exe...",
  "> Access Granted. Welcome, User."
];

export default function TerminalIntro() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 600); // 600ms per line
      return () => clearTimeout(timeout);
    } else {
      const endTimeout = setTimeout(() => {
        setIsDone(true);
      }, 1000); // Pause for 1 second before fading out
      return () => clearTimeout(endTimeout);
    }
  }, [currentLine]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#0a0a0a] text-green-500 font-mono flex flex-col justify-center px-12 md:px-24"
        >
          {terminalLines.slice(0, currentLine + 1).map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-2xl leading-relaxed tracking-tight"
            >
              {line}
            </motion.p>
          ))}
          {currentLine < terminalLines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-5 bg-green-500 ml-1 align-middle mt-2"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
