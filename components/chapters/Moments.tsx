"use client";

import type { Memory } from "@/data/album";
import { chapterMeta } from "@/data/album";
import { ChapterHeading, Polaroid, ScrapNote } from "../scrapbook";

export function Moments({ entries }: { entries: Memory[] }) {
  const meta = chapterMeta.moments;

  return (
    <section className="paper overflow-x-clip">
      <ChapterHeading number={meta.number} title={meta.title} />
      <div className="mx-auto flex max-w-lg flex-col gap-10 px-4 pb-24">
        <ScrapNote text={meta.intro} featured />
        {entries.map((entry, index) => {
          const side = index % 2 === 0 ? "mr-auto" : "ml-auto";
          if (!entry.image) {
            return (
              <ScrapNote
                key={entry.id}
                text={entry.note || entry.caption || ""}
                index={index}
                className={side}
              />
            );
          }
          return (
            <Polaroid
              key={entry.id}
              memory={entry}
              index={index}
              className={`w-[84%] ${side}`}
              tape={index % 2 === 0 ? "left" : "right"}
            />
          );
        })}
      </div>
    </section>
  );
}
