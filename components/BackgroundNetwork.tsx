"use client";

export function BackgroundNetwork() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-premium-accent/8 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/6 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[140px]" />

      {/* SVG network / constellation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(139, 92, 246, 0.25)"
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient id="dotGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Dots / nodes */}
        {[
          [10, 15], [25, 8], [40, 22], [55, 12], [70, 28], [85, 18], [92, 35],
          [15, 45], [30, 55], [50, 48], [65, 52], [80, 42], [20, 75], [45, 82], [75, 78],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r="1.5"
            fill="url(#dotGlow)"
          />
        ))}
        {/* Subtle lines between some nodes */}
        <line x1="10%" y1="15%" x2="25%" y2="8%" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.5" />
        <line x1="40%" y1="22%" x2="55%" y2="12%" stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.5" />
        <line x1="70%" y1="28%" x2="85%" y2="18%" stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.5" />
        <line x1="15%" y1="45%" x2="30%" y2="55%" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5" />
        <line x1="50%" y1="48%" x2="65%" y2="52%" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
