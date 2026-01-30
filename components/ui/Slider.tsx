"use client";

import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  unit = "",
}: SliderProps) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm text-slate-300 font-medium">
          {label}
        </label>
        <span className="text-xs text-premium-accent-dim tabular-nums">
          {typeof value === "number" ? value.toFixed(step >= 1 ? 0 : 2) : value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-2 rounded-full appearance-none cursor-pointer
          bg-slate-700/80 accent-premium-accent
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-premium-accent
          [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(139,92,246,0.6)]
          [&::-webkit-slider-thumb]:cursor-pointer
        "
      />
    </div>
  );
}
