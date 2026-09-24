"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { secretGate } from "@/data/album";
import { Heart } from "./scrapbook";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function SecretGate({ onUnlock }: { onUnlock: () => void }) {
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    document.body.classList.remove("album-open");
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    const ok = normalize(value) === normalize(secretGate.password);

    if (!ok) {
      setError(true);
      setShake((n) => n + 1);
      setValue("");
      inputRef.current?.focus();
      return;
    }

    onUnlock();
  }

  return (
    <div
      id="secret-gate"
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 20%, rgba(255,220,200,0.12), transparent 46%), linear-gradient(165deg, #5c3838 0%, #2c1a1c 55%, #140e10 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-5 border border-[#d4c4a8]/25 sm:inset-8" />
      <div className="pointer-events-none absolute inset-7 border border-[#d4c4a8]/10 sm:inset-10" />

      <motion.div
        key={shake}
        className="relative w-full max-w-sm text-center text-[#f6efe8]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={
          error && !reduce
            ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] }
            : { opacity: 1, y: 0, x: 0 }
        }
        transition={{ duration: error ? 0.45 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-serif text-[0.68rem] tracking-[0.42em] text-[#e7d3cb]/70 uppercase">
          {secretGate.onlyFor}
        </p>
        <h1 className="mt-5 font-script text-[clamp(2.4rem,10vw,3.2rem)] leading-[1.15] text-[#f3e6c8]">
          Our Little Story
          <Heart className="ml-2 inline-block h-[0.38em] w-[0.38em] translate-y-[-0.06em] text-[#e7d3cb]" />
        </h1>
        <p className="mx-auto mt-5 max-w-[16rem] font-serif text-xl leading-snug text-[#f6ebe3]/90 italic">
          {secretGate.line}
        </p>

        <form onSubmit={submit} className="mt-10">
          <label className="block">
            <span className="font-serif text-[0.68rem] tracking-[0.28em] text-[#e4d2ae]/80 uppercase">
              {secretGate.hintLabel}
            </span>
            <span className="mt-2 block font-hand text-[1.55rem] leading-snug text-[#f3e6c8]/95">
              “{secretGate.hint}”
            </span>
          </label>

          <input
            ref={inputRef}
            type="password"
            name="album-password"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(false);
            }}
            placeholder={secretGate.placeholder}
            className="mt-7 w-full border-b border-[#d7bc86]/55 bg-transparent px-1 py-3 text-center font-serif text-lg tracking-[0.18em] text-[#f6efe8] outline-none placeholder:text-[#f6efe8]/35 placeholder:tracking-[0.12em] focus:border-[#f3e6c8]"
            aria-invalid={error}
          />

          {error && (
            <p className="mt-3 font-serif text-sm text-[#e7b8b0] italic">
              {secretGate.wrong}
            </p>
          )}

          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-3 font-serif text-[0.78rem] tracking-[0.28em] text-[#f3e6c8] uppercase"
          >
            <span className="border-b border-[#d7bc86]/70 pb-1">
              {secretGate.submit}
            </span>
            <span aria-hidden>→</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
