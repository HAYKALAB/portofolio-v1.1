
export default function Blackhole() {
  return (
    <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] pointer-events-none">
      <div
        className="absolute inset-0 rounded-full motion-safe:animate-[spin_9s_linear_infinite] opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #60A5FA 60deg, #93C5FD 100deg, transparent 160deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, transparent 38%, black 42%, black 70%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 38%, black 42%, black 70%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 rounded-full blur-2xl bg-blue-500/10" />
      <div
        id="blackhole-core"
        className="absolute inset-[38%] rounded-full bg-black shadow-[0_0_60px_20px_rgba(59,130,246,0.25)]"
      />
    </div>
  );
}