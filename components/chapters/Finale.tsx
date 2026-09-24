"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Memory } from "@/data/album";
import { finaleCopy } from "@/data/album";
import { Heart } from "../scrapbook";

const line = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Finale({
  entries,
  onReplay,
}: {
  entries: Memory[];
  onReplay: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();
  const photo = entries.find((entry) => entry.image);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-night px-6 py-24 text-[#f6efe8]">
      <div className="photo-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(92,48,52,0.35),transparent_62%)]" />

      <div className="relative w-full max-w-lg" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="sealed"
              className="flex flex-col items-center text-center"
              exit={
                reduce
                  ? { opacity: 0 }
                  : { rotateX: -70, opacity: 0, originY: 0 }
              }
              transition={{ duration: 0.7, ease: [0.7, 0.02, 0.25, 1] }}
            >
              <p className="max-w-[16rem] font-serif text-[1.85rem] leading-snug italic">
                {finaleCopy.wait}
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="group mt-10 inline-flex items-center gap-3 font-serif text-[0.78rem] tracking-[0.26em] text-[#f3e6c8] uppercase"
              >
                <span className="border-b border-[#d7bc86]/60 pb-1">{finaleCopy.open}</span>
                <span aria-hidden>👀</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="last"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              {photo?.image && (
                <motion.figure
                  className="w-[min(78vw,18.5rem)] border border-[#d7bc86]/40 bg-[#241618] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.38)]"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative overflow-hidden bg-[#2a1c1e]"
                    style={{ aspectRatio: "0.5922" }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.03 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: reduce ? 0.2 : 8, ease: "easeOut" }}
                    >
                      <Image
                        src={photo.image}
                        alt="The last page"
                        fill
                        sizes="(max-width: 768px) 78vw, 460px"
                        quality={95}
                        className="object-contain object-center"
                      />
                    </motion.div>
                  </div>
                  {(photo.caption || photo.note) && (
                    <figcaption className="px-2 pt-3 pb-1 text-center">
                      {photo.caption && (
                        <p className="font-hand text-xl leading-tight text-[#f6efe8]/92">
                          {photo.caption}
                        </p>
                      )}
                      {photo.note && (
                        <p className="mt-1 font-serif text-sm leading-snug text-[#e4d2ae]/80 italic">
                          {photo.note}
                        </p>
                      )}
                    </figcaption>
                  )}
                </motion.figure>
              )}

              <motion.div
                className="mx-auto mt-10 max-w-sm text-center"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: reduce ? 0 : 0.5,
                      delayChildren: reduce ? 0 : 0.75,
                    },
                  },
                }}
              >
                <motion.p variants={line} className="font-serif text-2xl text-[#f6efe8]/90 italic">
                  {finaleCopy.line1}
                </motion.p>
                <motion.p
                  variants={line}
                  className="mt-4 font-script text-[clamp(2.6rem,10vw,3.4rem)] leading-[1.2] text-[#f3e6c8]"
                >
                  {finaleCopy.line2}
                  <Heart className="ml-2 inline-block h-[0.38em] w-[0.38em] translate-y-[-0.05em] text-[#e7d3cb]" />
                </motion.p>
                <motion.p
                  variants={line}
                  className="mt-5 font-serif text-lg leading-relaxed text-[#f6efe8]/75"
                >
                  {finaleCopy.line3}
                </motion.p>
                <motion.p
                  variants={line}
                  className="mt-6 font-hand text-[1.65rem] text-[#f3e6c8]/90"
                >
                  {finaleCopy.signOff}
                </motion.p>
                <motion.div variants={line}>
                  <button
                    type="button"
                    onClick={onReplay}
                    className="mt-10 inline-flex items-center gap-2 border-b border-[#d7bc86]/45 pb-1 font-serif text-[0.72rem] tracking-[0.26em] text-[#f3e6c8]/85 uppercase"
                  >
                    {finaleCopy.replay}
                    <span aria-hidden>↻</span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
