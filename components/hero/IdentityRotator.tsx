"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/profile";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { editorialEase } from "@/lib/motion";

const RESOLVED_WORDS = profile.heroKicker.split(" × ");
const ROLE_HOLD_MS = 2100;
const RESOLVED_HOLD_MS = 3400;

/**
 * Cycles through Shahin's roles, then periodically resolves them into the
 * central "Design × Marketing × Analytics" phrase with a staggered
 * word-connect reveal — a deliberate alternative to a typewriter effect.
 */
export function IdentityRotator() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const totalSteps = profile.identityRoles.length + 1;
  const isResolved = index === profile.identityRoles.length;

  useEffect(() => {
    if (reducedMotion) return;
    const delay = isResolved ? RESOLVED_HOLD_MS : ROLE_HOLD_MS;
    const timeout = setTimeout(() => {
      setIndex((current) => (current + 1) % totalSteps);
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, isResolved, reducedMotion, totalSteps]);

  if (reducedMotion) {
    return (
      <p className="font-data text-lg font-medium tracking-tight text-royal-300 sm:text-xl">
        {profile.heroKicker}
      </p>
    );
  }

  return (
    <div className="flex h-10 items-center sm:h-12">
      <AnimatePresence mode="wait">
        {isResolved ? (
          <motion.p
            key="resolved"
            className="font-data text-lg font-medium tracking-tight text-royal-300 sm:text-xl"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {RESOLVED_WORDS.map((word, i) => (
              <span key={word} className="inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: editorialEase, delay: i * 0.18 }}
                >
                  {word}
                </motion.span>
                {i < RESOLVED_WORDS.length - 1 && (
                  <motion.span
                    className="mx-2 inline-block text-crimson-500"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: editorialEase, delay: i * 0.18 + 0.12 }}
                  >
                    ×
                  </motion.span>
                )}
              </span>
            ))}
          </motion.p>
        ) : (
          <motion.p
            key={profile.identityRoles[index]}
            className="font-data text-lg font-medium tracking-tight text-soft-white/90 sm:text-xl"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.35, ease: editorialEase } }}
            transition={{ duration: 0.45, ease: editorialEase }}
          >
            {profile.identityRoles[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
