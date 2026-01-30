"use client";

export function Header() {
  return (
    <header className="text-center mb-8 md:mb-10">
      <h1 className="font-display text-5xl md:text-7xl tracking-[0.02em] leading-none">
        <span
          className="
            bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(34,211,238,0.25)]
            drop-shadow-[0_0_28px_rgba(236,72,153,0.18)]
          "
        >
          Pulse Premium
        </span>
      </h1>
      <p className="mt-3 font-display text-sm md:text-base tracking-[0.04em] text-slate-300/85 max-w-lg mx-auto">
        Générateur de photo de profil TikTok premium. Choisis ton cadre, ajuste ta photo, télécharge en HD.
      </p>
    </header>
  );
}
