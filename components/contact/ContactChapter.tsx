"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { contactLinks } from "@/content/contact";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { fadeUp, revealViewport, staggerChildren } from "@/lib/motion";

export function ContactChapter() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-charcoal-surface bg-charcoal">
      {/* Closing image: a wide, warm horizon, but darkened and cooled to sit
          in the same palette as the rest of the site rather than clashing
          with it — a heavy scrim for legibility, a royal-blue multiply pass
          to pull the warm sunset toward the site's blue/crimson duotone, and
          a top fade so the previous section eases into it instead of
          cutting off sharply. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/closing-summit.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
        <div className="absolute inset-0 bg-royal-950/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/55 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:px-8 md:py-36"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerChildren(0.12)}
      >
        <motion.h2
          variants={fadeUp}
          className="text-balance font-display text-3xl font-medium leading-tight text-soft-white sm:text-4xl md:text-5xl"
        >
          {profile.closingHeadline}
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-pretty text-light-gray">
          {profile.closingBody}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                link.id === "email" || link.id === "opportunity"
                  ? "bg-royal-400 text-charcoal hover:bg-royal-300"
                  : "border border-light-gray/30 text-soft-white hover:border-light-gray/60"
              }`}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {contactLinks.some((l) => l.isPlaceholder) && (
          <motion.div variants={fadeUp} className="mt-4 flex justify-center">
            <PlaceholderBadge text="Add real LinkedIn, email, and résumé links" />
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mt-14">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-soft-white"
          >
            <span aria-hidden="true">↺</span>
            Replay the journey from the beginning
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
