"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GenerativeCanvas } from "./GenerativeCanvas";
import { IdentityRotator } from "./IdentityRotator";
import { profile } from "@/content/profile";
import { contactLinks } from "@/content/contact";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { editorialEase } from "@/lib/motion";

const resumeLink = contactLinks.find((link) => link.id === "resume");
const opportunityLink = contactLinks.find((link) => link.id === "opportunity");

export function HeroIdentity() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-charcoal-surface bg-charcoal"
    >
      {/* Summit photo, kept to the right so it sits behind the left-aligned
          copy rather than under it — same image as the closing section, for
          a "starts and ends on the same horizon" bookend. Darkened and
          cooled (a royal-blue multiply pass) rather than left at full color
          so its sunset doesn't fight the palette, and faded on every edge
          (not just a rectangle crop) so it reads as part of the background
          rather than a pasted-in image. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-3/4 lg:w-1/2" aria-hidden="true">
        <Image
          src="/images/closing-summit.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_55%]"
        />
        <div className="absolute inset-0 bg-royal-950/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/70" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-royal-950/40 via-charcoal to-charcoal"
        aria-hidden="true"
      />
      <GenerativeCanvas progress={progress} />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-32 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: editorialEase }}
          className="mb-6 font-data text-xs font-medium uppercase tracking-[0.3em] text-warm-gray"
        >
          {profile.currentTitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: editorialEase, delay: 0.08 }}
          className="max-w-4xl text-balance font-display text-5xl font-medium leading-[1.05] text-soft-white sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: editorialEase, delay: 0.18 }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-light-gray sm:text-xl"
        >
          {profile.heroSummary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: editorialEase, delay: 0.3 }}
          className="mt-10"
        >
          <IdentityRotator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: editorialEase, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="#timeline"
            className="rounded-full bg-royal-400 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-royal-300"
          >
            Explore My Journey
          </a>
          <a
            href="#work"
            className="rounded-full border border-light-gray/30 px-6 py-3 text-sm font-medium text-soft-white transition-colors hover:border-light-gray/60"
          >
            View Selected Work
          </a>
          {resumeLink && (
            <a
              href={resumeLink.href}
              className="rounded-full border border-light-gray/30 px-6 py-3 text-sm font-medium text-soft-white transition-colors hover:border-light-gray/60"
            >
              Download Résumé
            </a>
          )}
          {opportunityLink && (
            <a
              href="#contact"
              className="rounded-full px-6 py-3 text-sm font-medium text-warm-gray underline decoration-warm-gray/40 underline-offset-4 transition-colors hover:text-soft-white"
            >
              Connect
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
