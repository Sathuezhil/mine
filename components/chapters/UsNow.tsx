"use client";

import type { Memory } from "@/data/album";
import { chapterMeta, usNowCopy } from "@/data/album";
import { ChapterHeading, FramedPhoto, Heart } from "../scrapbook";

export function UsNow({ entries }: { entries: Memory[] }) {
  const meta = chapterMeta.now;
  const [hero, ...rest] = entries;

  return (
    <section className="paper-warm overflow-x-clip">
      <ChapterHeading number={meta.number} title={meta.title} />
      <div className="mx-auto max-w-xl px-5 pb-28">
        {hero && <FramedPhoto memory={hero} className="w-full" />}
        <blockquote className="my-16 text-center">
          <p className="font-serif text-[clamp(1.85rem,6vw,2.35rem)] leading-tight text-ink italic">
            {usNowCopy.line1}
          </p>
          <p className="mt-6 font-hand text-[clamp(2rem,7vw,2.6rem)] leading-tight text-burgundy">
            {usNowCopy.line2}{" "}
            <Heart className="ml-1 inline-block h-[0.55em] w-[0.55em] translate-y-[-0.06em]" />
          </p>
        </blockquote>
        <div className="flex flex-col gap-14">
          {rest.map((memory, index) => (
            <FramedPhoto
              key={memory.id}
              memory={{ ...memory, tilt: memory.tilt ?? (index % 2 === 0 ? -1.4 : 1.6) }}
              className={index % 2 === 0 ? "mr-auto w-[92%]" : "ml-auto w-[92%]"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
