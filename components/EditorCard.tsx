"use client";

import { useRef, useState, useEffect } from "react";
import type Konva from "konva";
import { BannerStage } from "@/components/BannerStage";
import { Controls } from "@/components/Controls";

const PREVIEW_WIDTH = 720;
const PREVIEW_HEIGHT = 720;

export function EditorCard() {
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const [previewSize, setPreviewSize] = useState({ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT });

  const setContainerRef = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    setContainerEl(el);
  };

  useEffect(() => {
    if (!containerEl) return;

    const updateSize = () => {
      const rect = containerEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scale = Math.min(rect.width / PREVIEW_WIDTH, rect.height / PREVIEW_HEIGHT, 1);
      setPreviewSize({
        width: Math.round(PREVIEW_WIDTH * scale),
        height: Math.round(PREVIEW_HEIGHT * scale),
      });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerEl);
    return () => ro.disconnect();
  }, [containerEl]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Contour multicolore façon “traits” + mouvement */}
      <div
        className="
          rounded-3xl p-[2px]
          bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(168,85,247,0.95),rgba(236,72,153,0.95),rgba(250,204,21,0.9),rgba(34,211,238,0.95))]
          [background-size:200%_200%]
          animate-[pp-borderflow_10s_linear_infinite]
          shadow-[0_0_60px_rgba(34,211,238,0.12),0_0_90px_rgba(236,72,153,0.10)]
        "
      >
        <div
          className="
            relative rounded-3xl
            bg-slate-950/95
            shadow-[0_16px_60px_rgba(0,0,0,0.55)]
            p-5 md:p-8
            flex flex-col md:flex-row gap-8
          "
        >
          <div className="flex-1 order-2 md:order-1 min-w-0">
            <p className="text-sm font-medium text-slate-300/90 mb-3">Aperçu</p>

            {/* Circular portal look */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.18),transparent_55%)] blur-2xl" />
              <div className="relative p-[1px] rounded-[28px] bg-gradient-to-r from-fuchsia-500/40 via-violet-500/35 to-cyan-400/35">
                <div className="rounded-[27px] bg-slate-950/45 border border-white/10 p-3">
                  <div
                    ref={setContainerRef}
                    className="flex justify-center min-h-[280px] aspect-square w-full max-w-full"
                  >
                    <BannerStage
                      stageRef={stageRef}
                      width={previewSize.width}
                      height={previewSize.height}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full md:w-96 flex-shrink-0 order-1 md:order-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(56,189,248,0.10)]">
              <Controls stageRef={stageRef} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
