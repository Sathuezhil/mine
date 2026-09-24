"use client";

import { useEffect, useState } from "react";
import { entriesFor } from "@/data/album";
import { Ambient } from "./Ambient";
import { Cover } from "./Cover";
import { MusicToggle } from "./MusicToggle";
import { SecretGate } from "./SecretGate";
import { Started } from "./chapters/Started";
import { Moments } from "./chapters/Moments";
import { Memories } from "./chapters/Memories";
import { RandomUs } from "./chapters/RandomUs";
import { LittleThings } from "./chapters/LittleThings";
import { SecretLetters } from "./chapters/SecretLetters";
import { LoveCoupons } from "./chapters/LoveCoupons";
import { NightSky } from "./chapters/NightSky";
import { UsNow } from "./chapters/UsNow";
import { Finale } from "./chapters/Finale";

export function Album() {
  // Always start locked — password is the first screen every visit.
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [storyKey, setStoryKey] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("album-open", unlocked && ready);
    return () => document.body.classList.remove("album-open");
  }, [unlocked, ready]);

  function openAlbum() {
    if (open) return;
    window.scrollTo(0, 0);
    setOpen(true);
  }

  function replay() {
    window.scrollTo(0, 0);
    setReady(false);
    setOpen(false);
    setStoryKey((key) => key + 1);
  }

  if (!unlocked) {
    return (
      <>
        <Ambient />
        <SecretGate onUnlock={() => setUnlocked(true)} />
      </>
    );
  }

  return (
    <>
      <Ambient />
      <MusicToggle />
      <Cover open={open} onOpen={openAlbum} onOpened={() => setReady(true)} />
      <main key={storyKey}>
        <Started entries={entriesFor("started")} />
        <Moments entries={entriesFor("moments")} />
        <Memories entries={entriesFor("keep")} />
        <RandomUs entries={entriesFor("random")} />
        <LittleThings />
        <SecretLetters />
        <LoveCoupons />
        <NightSky />
        <UsNow entries={entriesFor("now")} />
        <Finale entries={entriesFor("finale")} onReplay={replay} />
      </main>
    </>
  );
}
