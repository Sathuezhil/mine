"use client";

import { useRef, useState } from "react";
import { music } from "@/data/album";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.volume = 0.45;
      await audio.play();
      setPlaying(true);
      setHint(null);
    } catch {
      setPlaying(false);
      setHint("Couldn't play the song. Check public/song/Oru-Devadhai.mp3");
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onError={() => {
          setPlaying(false);
          setHint("Couldn't play the song. Check public/song/Oru-Devadhai.mp3");
        }}
      />
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex flex-col items-end gap-2">
        {hint && (
          <p className="max-w-[12.5rem] bg-[#2a1c1c]/92 px-3 py-2 text-right font-serif text-xs leading-snug text-[#f6efe8]">
            {hint}
          </p>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause music" : "Play music"}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d7bc86]/55 bg-[#f6f1e8]/85 text-burgundy shadow-[0_8px_24px_rgba(60,30,30,0.12)] backdrop-blur-md"
        >
          {playing && (
            <span className="breath pointer-events-none absolute inset-[-3px] rounded-full border border-[#b8956a]/50" />
          )}
          {playing ? <PauseIcon /> : <NoteIcon />}
        </button>
      </div>
    </>
  );
}

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M9.2 17.6a2.35 2.35 0 1 1-1.7-2.25V6.15l9.3-1.85v8.15a2.35 2.35 0 1 1-1.7.1V6.55l-5.9 1.15v9.9z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="currentColor">
      <rect x="2.2" y="1.8" width="3.1" height="10.4" rx="0.6" />
      <rect x="8.7" y="1.8" width="3.1" height="10.4" rx="0.6" />
    </svg>
  );
}
