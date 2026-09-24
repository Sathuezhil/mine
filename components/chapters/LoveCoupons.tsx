"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  chapterMeta,
  loveCoupons,
  type LoveCoupon,
} from "@/data/album";
import { ChapterHeading, Heart } from "../scrapbook";

const TILTS = [-1.8, 1.5, -1.2, 2, -1.6, 1.1];

const BURSTS = [
  { left: "12%", delay: 0 },
  { left: "28%", delay: 0.05 },
  { left: "45%", delay: 0.1 },
  { left: "62%", delay: 0.04 },
  { left: "78%", delay: 0.08 },
  { left: "88%", delay: 0.12 },
];

export function LoveCoupons() {
  const meta = chapterMeta.coupons;

  return (
    <section className="paper overflow-x-clip">
      <ChapterHeading
        number={meta.number}
        title={meta.title}
        intro={meta.intro}
        hint={meta.hint}
      />
      <div className="mx-auto flex max-w-lg flex-col gap-8 px-5 pb-24">
        {loveCoupons.map((coupon, index) => (
          <CouponTicket key={coupon.id} coupon={coupon} index={index} />
        ))}
      </div>
    </section>
  );
}

function CouponTicket({
  coupon,
  index,
}: {
  coupon: LoveCoupon;
  index: number;
}) {
  const [redeemed, setRedeemed] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  useEffect(() => {
    if (!celebrating) return;
    const timer = window.setTimeout(() => setCelebrating(false), 1600);
    return () => window.clearTimeout(timer);
  }, [celebrating]);

  function redeem() {
    if (redeemed) return;
    setRedeemed(true);
    setCelebrating(true);
  }

  return (
    <motion.article
      className={`relative mx-auto w-full max-w-[22rem] ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
      style={{ rotate: redeemed ? 0 : tilt }}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`relative overflow-hidden lift transition-colors duration-500 ${
          redeemed ? "bg-[#efe6da]" : "bg-[#fbf6ee]"
        }`}
        style={{
          borderRadius: "4px 12px 4px 12px",
          backgroundImage: redeemed
            ? undefined
            : "repeating-linear-gradient(90deg, transparent 0 10px, rgba(201,165,155,0.08) 10px 11px)",
        }}
      >
        {/* ticket notches */}
        <span
          aria-hidden
          className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full bg-cream"
        />
        <span
          aria-hidden
          className="absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full bg-cream"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-3 left-[18%] w-px border-l border-dashed border-burgundy/20"
        />

        <div className="relative flex gap-3 px-4 py-4 pl-7">
          <div className="flex w-10 shrink-0 flex-col items-center justify-center border-r border-dashed border-burgundy/20 pr-2">
            <span className="font-serif text-[0.58rem] tracking-[0.18em] text-burgundy/55 uppercase [writing-mode:vertical-rl] rotate-180">
              love coupon
            </span>
          </div>

          <div className="min-w-0 flex-1 py-1 pr-1">
            <p className="font-serif text-[0.62rem] tracking-[0.28em] text-burgundy/55 uppercase">
              admit one heart
            </p>
            <h3 className="mt-1.5 font-hand text-[1.7rem] leading-tight text-ink">
              {coupon.title}
            </h3>
            <p className="mt-1.5 font-serif text-[0.98rem] leading-snug text-ink/75 italic">
              {redeemed ? coupon.redeemedNote : coupon.detail}
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              {!redeemed ? (
                <button
                  type="button"
                  onClick={redeem}
                  className="inline-flex items-center gap-2 border-b border-burgundy/45 pb-0.5 font-serif text-[0.72rem] tracking-[0.22em] text-burgundy uppercase"
                >
                  Redeem
                  <Heart className="h-3 w-3" />
                </button>
              ) : (
                <motion.span
                  initial={reduce ? false : { scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 font-hand text-[1.35rem] text-burgundy"
                >
                  Redeemed
                  <Heart className="h-3.5 w-3.5" />
                </motion.span>
              )}
              <span className="font-serif text-[0.62rem] tracking-[0.16em] text-burgundy/45 uppercase">
                no expiry
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {redeemed && (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.4, rotate: -12 }}
              animate={{ opacity: 0.9, scale: 1, rotate: -8 }}
              className="pointer-events-none absolute top-3 right-4 rounded-full border-2 border-burgundy/70 px-2.5 py-1 font-serif text-[0.62rem] tracking-[0.2em] text-burgundy/80 uppercase"
            >
              claimed
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {celebrating && !reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {BURSTS.map((burst, i) => (
                <motion.span
                  key={i}
                  className="absolute bottom-4 text-burgundy"
                  style={{ left: burst.left }}
                  initial={{ y: 0, opacity: 0, scale: 0.4 }}
                  animate={{
                    y: -120 - (i % 3) * 24,
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.1, 0.8],
                    rotate: [-10, 12, -6],
                  }}
                  transition={{
                    duration: 1.25,
                    delay: burst.delay,
                    ease: "easeOut",
                  }}
                >
                  <Heart className="h-3.5 w-3.5" />
                </motion.span>
              ))}
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,230,200,0.45),transparent_62%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
