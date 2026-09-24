const DUST = [
  { left: "7%", top: "16%", delay: "0s", duration: "23s", size: 2 },
  { left: "18%", top: "72%", delay: "3s", duration: "27s", size: 1.5 },
  { left: "78%", top: "22%", delay: "1.5s", duration: "21s", size: 2 },
  { left: "88%", top: "64%", delay: "5s", duration: "26s", size: 1.5 },
  { left: "42%", top: "8%", delay: "2s", duration: "24s", size: 1.5 },
  { left: "62%", top: "84%", delay: "4s", duration: "28s", size: 2 },
  { left: "30%", top: "46%", delay: "6s", duration: "22s", size: 1 },
  { left: "92%", top: "40%", delay: "1s", duration: "25s", size: 1.5 },
];

export function Ambient() {
  return (
    <div className="ambient pointer-events-none fixed inset-0 z-30 mix-blend-soft-light" aria-hidden>
      {DUST.map((speck, index) => (
        <span
          key={index}
          className="floaty absolute rounded-full bg-white"
          style={{
            left: speck.left,
            top: speck.top,
            width: speck.size,
            height: speck.size,
            animationDelay: speck.delay,
            animationDuration: speck.duration,
            opacity: 0.55,
          }}
        />
      ))}
      <svg
        className="floaty absolute top-[14%] left-[5%] opacity-[0.18]"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ animationDuration: "18s", color: "#6d3a3a" }}
      >
        <path d="M12 20.2s-6.6-4.1-6.6-8.6C5.4 8.8 7.1 7.2 9.2 7.2c1.2 0 2.2.6 2.8 1.5.6-.9 1.6-1.5 2.8-1.5 2.1 0 3.8 1.6 3.8 4.4 0 4.5-6.6 8.6-6.6 8.6z" />
      </svg>
      <svg
        className="floaty absolute top-[68%] right-[7%] opacity-[0.14]"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ animationDuration: "22s", animationDelay: "3s", color: "#6d3a3a" }}
      >
        <path d="M12 20.2s-6.6-4.1-6.6-8.6C5.4 8.8 7.1 7.2 9.2 7.2c1.2 0 2.2.6 2.8 1.5.6-.9 1.6-1.5 2.8-1.5 2.1 0 3.8 1.6 3.8 4.4 0 4.5-6.6 8.6-6.6 8.6z" />
      </svg>
    </div>
  );
}
