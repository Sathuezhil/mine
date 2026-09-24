"use client";

import type { Memory } from "@/data/album";
import { chapterMeta } from "@/data/album";
import { ChapterHeading, Polaroid } from "../scrapbook";

export function RandomUs({ entries }: { entries: Memory[] }) {
  const meta = chapterMeta.random;

  return (
    <section className="paper overflow-x-clip">
      <ChapterHeading number={meta.number} title={meta.title} intro={meta.intro} />
      <div className="mx-auto flex max-w-lg flex-col gap-12 px-4 pb-24">
        {entries.map((memory, index) => {
          const placement =
            index % 3 === 0
              ? "mx-auto w-[82%]"
              : index % 3 === 1
                ? "mr-auto ml-1 w-[74%]"
                : "ml-auto mr-1 w-[76%]";
          return (
            <Polaroid
              key={memory.id}
              memory={memory}
              index={index}
              className={placement}
              tape={index % 2 === 0 ? "right" : "left"}
              playful
            />
          );
        })}
      </div>
    </section>
  );
}
