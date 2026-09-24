"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { Memory } from "@/data/album";
import { chapterMeta } from "@/data/album";
import { ChapterHeading } from "../scrapbook";

export function Memories({ entries }: { entries: Memory[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (entries.length === 0) return;
    const next = Math.min(
      entries.length - 1,
      Math.max(0, Math.floor(value * entries.length)),
    );
    setIndex((current) => (current === next ? current : next));
  });

  const meta = chapterMeta.keep;
  if (entries.length === 0) return null;

  if (reduce) {
    return (
      <section className="bg-night">
        <div className="paper">
          <ChapterHeading number={meta.number} title={meta.title} intro={meta.intro} />
        </div>
        {entries.map((memory) => (
          <MemorySlide key={memory.id} memory={memory} active />
        ))}
      </section>
    );
  }

  return (
    <section>
      <div className="paper">
        <ChapterHeading number={meta.number} title={meta.title} intro={meta.intro} />
      </div>
      <div ref={ref} className="relative" style={{ height: `${entries.length * 100}svh` }}>
        <div className="sticky top-0 h-svh overflow-hidden bg-night">
          {entries.map((memory, slide) => (
            <MemorySlide key={memory.id} memory={memory} active={slide === index} />
          ))}
          <div className="absolute top-6 right-5 flex gap-1.5">
            {entries.map((memory, slide) => (
              <span
                key={memory.id}
                className={`h-px w-4 ${slide === index ? "bg-[#e4d2ae]" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MemorySlide({ memory, active }: { memory: Memory; active: boolean }) {
  const label = memory.location || memory.note;

  return (
    <motion.article
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!active}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ scale: active ? 1 : 1.08 }}
        transition={{ duration: active ? 7 : 0.9, ease: "easeOut" }}
      >
        {memory.image && (
          <Image
            src={memory.image}
            alt={memory.caption || memory.memory || "A memory"}
            fill
            sizes="100vw"
            quality={95}
            className="object-cover"
          />
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,14,16,0.84)_0%,rgba(20,14,16,0.28)_42%,transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 pt-6 pb-12 sm:px-12">
        <div className="max-w-lg">
          {label && (
            <p className="font-serif text-[0.78rem] tracking-[0.22em] text-[#e4d2ae]/85">
              {label}
            </p>
          )}
          {memory.caption && (
            <p className="mt-3 font-hand text-[2.4rem] leading-none text-[#f6efe8]">
              {memory.caption}
            </p>
          )}
          {memory.memory && (
            <p className="mt-3 max-w-sm font-serif text-xl leading-snug text-[#f6efe8]/92 italic">
              {memory.memory}
            </p>
          )}
          {memory.note && (
            <p className="mt-4 max-w-xs font-hand text-[1.55rem] leading-snug text-[#f3e6c8]/85">
              {memory.note}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
