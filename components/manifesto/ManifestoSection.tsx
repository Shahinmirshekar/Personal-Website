"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { revealViewport } from "@/lib/motion";

export function ManifestoSection() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-28 text-center sm:px-8 md:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ visible: { transition: { staggerChildren: 0.22 } } }}
      >
        {profile.manifesto.map((line, i) => (
          <motion.p
            key={line}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className={`text-balance font-display leading-snug ${
              i === 0 || i === profile.manifesto.length - 1
                ? "text-2xl font-medium text-soft-white sm:text-3xl"
                : "mt-3 text-xl text-light-gray sm:text-2xl"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
