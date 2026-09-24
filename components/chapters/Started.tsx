"use client";

import type { Memory } from "@/data/album";
import { chapterMeta } from "@/data/album";
import { ChapterHeading, Polaroid } from "../scrapbook";

export function Started({ entries }: { entries: Memory[] }) {
  const meta = chapterMeta.started;

  return (
    <section className="paper">
      <ChapterHeading
        number={meta.number}
        title={meta.title}
        intro={meta.intro}
        first
      />
      <div className="mx-auto flex max-w-xl flex-col gap-20 px-5 pb-24">
        {entries.map((memory, index) => (
          <Polaroid
            key={memory.id}
            memory={memory}
            index={index}
            className="w-full"
            priority={index === 0}
            immediate={index === 0}
            tape={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}
