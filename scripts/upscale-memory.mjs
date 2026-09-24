/**
 * Upscale / re-encode album photos for sharp full-screen viewing.
 * Long edge targets 3840px (4K). Already-larger files are kept as-is, re-encoded cleanly.
 *
 * Usage: node scripts/upscale-memory.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/memory");
const BACKUP = path.resolve("public/memory/_originals");
const TARGET = 3840;
const QUALITY = 92;

const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

await fs.promises.mkdir(BACKUP, { recursive: true });

const files = (await fs.promises.readdir(DIR)).filter((name) => {
  if (name.startsWith("_") || name.startsWith(".")) return false;
  return EXTS.has(path.extname(name).toLowerCase());
});

for (const name of files) {
  const src = path.join(DIR, name);
  const backupPath = path.join(BACKUP, name);
  if (!fs.existsSync(backupPath)) {
    await fs.promises.copyFile(src, backupPath);
  }

  const input = sharp(src, { failOn: "none" }).rotate();
  const meta = await input.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const long = Math.max(w, h);

  let pipeline = sharp(src, { failOn: "none" }).rotate();

  if (long > 0 && long < TARGET) {
    const scale = TARGET / long;
    pipeline = pipeline.resize({
      width: Math.round(w * scale),
      height: Math.round(h * scale),
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    });
  } else if (long > TARGET * 1.15) {
    // Cap extreme originals slightly above 4K to keep pages light, still sharp on phones/desktops
    const scale = TARGET / long;
    pipeline = pipeline.resize({
      width: Math.round(w * scale),
      height: Math.round(h * scale),
      kernel: sharp.kernel.lanczos3,
    });
  }

  const base = path.parse(name).name;
  const outJpg = path.join(DIR, `${base}.jpg`);

  await pipeline
    .jpeg({
      quality: QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(outJpg + ".tmp");

  await fs.promises.rename(outJpg + ".tmp", outJpg);

  // Drop non-jpg originals in the live folder once we have the jpg (keep backup)
  if (src.toLowerCase() !== outJpg.toLowerCase() && fs.existsSync(src)) {
    try {
      await fs.promises.unlink(src);
    } catch {
      // Windows may lock the file if the browser is reading it — leave it.
    }
  }

  const outMeta = await sharp(outJpg).metadata();
  console.log(
    `${name}  ${w}x${h}  →  ${outMeta.width}x${outMeta.height}  (${base}.jpg)`,
  );
}

console.log("Done. Originals kept in public/memory/_originals/");
