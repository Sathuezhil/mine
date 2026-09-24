"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { album } from "@/data/album";
import { Heart } from "./scrapbook";

export function Cover({
  open,
  onOpen,
  onOpened,
}: {
  open: boolean;
  onOpen: () => void;
  onOpened: () => void;
}) {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!open) setSettled(false);
  }, [open]);

  return (
    <div
      id="album-cover"
      className="fixed inset-0 z-40"
      style={{
        perspective: 2200,
        pointerEvents: open ? "none" : "auto",
        visibility: open && settled ? "hidden" : "visible",
      }}
      aria-hidden={open && settled}
    >
      <motion.div
        className="h-full w-full"
        style={{ originX: 0, originY: 0.5, transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: open ? -158 : 0 }}
        transition={{
          duration: reduce ? 0.01 : 1.35,
          ease: [0.7, 0.02, 0.25, 1],
        }}
        onAnimationComplete={() => {
          if (open) onOpened();
          setSettled(open);
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden text-[#f6efe4] shadow-[18px_0_50px_rgba(0,0,0,0.28)]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(255,220,200,0.16), transparent 46%), radial-gradient(ellipse at 50% 120%, rgba(0,0,0,0.38), transparent 48%), linear-gradient(165deg, #5c3838 0%, #3f2628 52%, #2c1a1c 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/45 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-[#d7bc86]/25" />
          <div className="pointer-events-none absolute inset-4 border border-[#d4c4a8]/35 sm:inset-6" />
          <div className="pointer-events-none absolute inset-6 border border-[#d4c4a8]/15 sm:inset-8" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-40%" }}
            animate={{ x: open ? "220%" : "-40%" }}
            transition={{ duration: reduce ? 0 : 1.15, ease: "easeInOut" }}
          />

          <p className="absolute top-[max(2.4rem,env(safe-area-inset-top))] left-0 w-full text-center font-serif text-[0.68rem] tracking-[0.42em] text-[#e7d3cb]/75 uppercase">
            {album.dedication}
          </p>

          <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
            <h1 className="foil-text font-script text-[clamp(3.15rem,13vw,4.9rem)] leading-[1.12]">
              {album.title}
              <Heart className="ml-2 inline-block h-[0.42em] w-[0.42em] translate-y-[-0.08em] text-[#e7d3cb]" />
            </h1>
            <div className="my-6 h-px w-16 bg-gradient-to-r from-transparent via-[#d7bc86] to-transparent" />
            <p className="max-w-[16.5rem] font-serif text-[1.2rem] leading-relaxed text-[#f6ebe3]/90 italic">
              “{album.subtitle}”
            </p>
            <button
              type="button"
              onClick={onOpen}
              className="group mt-11 inline-flex items-center gap-3 font-serif text-[0.78rem] tracking-[0.28em] text-[#f3e6c8] uppercase"
            >
              <span className="border-b border-[#d7bc86]/70 pb-1">{album.open}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>
          </div>

          <p className="absolute bottom-[max(1.6rem,env(safe-area-inset-bottom))] left-0 w-full px-6 text-center">
            <span className="block font-serif text-[0.68rem] tracking-[0.32em] text-[#e7d3cb]/75 uppercase">
              {album.names.us}
            </span>
            <span className="mt-1.5 block font-hand text-[1.15rem] normal-case tracking-normal text-[#f3e6c8]/85">
              {album.from}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
