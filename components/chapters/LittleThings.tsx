"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { chapterMeta, littleThings, type LittleThing } from "@/data/album";
import { ChapterHeading } from "../scrapbook";

const TILTS = [-1.6, 1.5, -0.8, 1.7, -1.3];

export function LittleThings() {
  const meta = chapterMeta.things;

  return (
    <section className="paper">
      <ChapterHeading
        number={meta.number}
        title={meta.title}
        hint={meta.hint}
      />
      <div className="mx-auto flex max-w-lg flex-col gap-5 px-5 pb-24">
        {littleThings.map((thing, index) => (
          <ThingCard key={thing.id} thing={thing} index={index} />
        ))}
      </div>
    </section>
  );
}

function ThingCard({ thing, index }: { thing: LittleThing; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      className="relative w-full bg-[#f8f3ea] px-5 py-5 text-left lift"
      style={{ rotate: open ? 0 : tilt }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 left-8 h-4 w-12 -rotate-3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(184,149,106,0.3) 0 6px, rgba(243,232,208,0.85) 6px 12px)",
        }}
      />
      <span
        aria-hidden
        className="absolute top-5 right-4 h-3.5 w-3.5 rounded-full bg-burgundy shadow-[inset_0_0_0_3px_rgba(255,248,240,0.18)]"
        style={{ opacity: open ? 0.4 : 1, transform: open ? "scale(0.8)" : "scale(1)" }}
      />
      <span className="block max-w-[16.5rem] pr-6 font-hand text-[1.85rem] leading-tight text-ink">
        {thing.title}
      </span>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`pt-3 pr-2 font-serif text-lg leading-relaxed text-ink/80 italic transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {thing.line}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
