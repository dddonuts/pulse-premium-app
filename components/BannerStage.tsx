"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Group, Circle, Image } from "react-konva";
import type Konva from "konva";
import { useBannerStore } from "@/store/useBannerStore";
import { getFrame, type FrameConfig } from "@/frames";
import { loadImage } from "@/utils/loadImage";

// Profil TikTok : export carré (TikTok le crop en rond).
// On exporte un PNG carré 1080x1080. La photo est clippée en rond, et le cadre est dessiné ENTIER au-dessus.
const PROFILE_SIZE = 1080;

interface BannerStageProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  width: number;
  height: number;
}

function useLoadedImage(src: string | null) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }
    loadImage(src).then(setImage).catch(() => setImage(null));
  }, [src]);

  return image;
}

function FrameImage({ frame, size }: { frame: FrameConfig; size: number }) {
  const { src, cropYBias = 0.5 } = frame;
  const image = useLoadedImage(src);

  if (!image) return null;

  // Tes cadres sont souvent en portrait (ex: 720x1280) avec le design en bas.
  // On fait un crop automatique en carré (centré) pour garder le design complet (logo TikTok inclus).
  const iw = image.width;
  const ih = image.height;
  const cropSize = Math.min(iw, ih);
  const cropX = Math.floor((iw - cropSize) / 2);
  const maxCropY = Math.max(0, ih - cropSize);
  const cropY = Math.floor(maxCropY * cropYBias);

  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={size}
      height={size}
      crop={{ x: cropX, y: cropY, width: cropSize, height: cropSize }}
      listening={false}
    />
  );
}

export function BannerStage({ stageRef, width, height }: BannerStageProps) {
  const {
    photoDataUrl,
    photoScale,
    photoOffsetX,
    photoOffsetY,
    frameId,
  } = useBannerStore();

  const frame = getFrame(frameId);

  // Scale d'affichage (le stage reste en 1080x1080 pour l'export HD)
  const scale = Math.min(width / PROFILE_SIZE, height / PROFILE_SIZE);

  const cx = PROFILE_SIZE / 2;
  // Le "trou" de tes cadres est plus haut que le centre.
  // Ajuste ici si besoin (0.40–0.48 généralement).
  const cy = PROFILE_SIZE * 0.43;
  // Zone ronde de la photo (ajustable ensuite si besoin)
  const photoR = PROFILE_SIZE * 0.30;

  const photoImg = useLoadedImage(photoDataUrl);

  return (
    <div className="rounded-xl overflow-hidden bg-slate-900/50 border border-premium-border shadow-inner flex items-center justify-center min-h-[220px] w-full">
      {/* Wrapper de taille preview, et scale via transform (évite le clipping du canvas) */}
      <div
        style={{
          width: `${Math.max(1, Math.floor(width))}px`,
          height: `${Math.max(1, Math.floor(height))}px`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${PROFILE_SIZE}px`,
            height: `${PROFILE_SIZE}px`,
          }}
        >
          <Stage ref={stageRef} width={PROFILE_SIZE} height={PROFILE_SIZE}>
            <Layer>
              {/* 1) Photo derrière (clippée en rond) */}
              {photoImg && (
                <Group
                  clipFunc={(ctx) => {
                    ctx.beginPath();
                    ctx.arc(cx, cy, photoR, 0, Math.PI * 2, false);
                    ctx.closePath();
                  }}
                >
                  {(() => {
                    // Cover un carré 2R x 2R, avec zoom et offsets.
                    const target = photoR * 2;
                    const iw = photoImg.width;
                    const ih = photoImg.height;
                    // Overscan pour que Position X/Y fonctionne même sur des photos portrait
                    // (sinon un côté peut être exactement à target => aucun déplacement possible).
                    const OVERSCAN = 1.25;
                    const baseScale = Math.max(target / iw, target / ih) * OVERSCAN;
                    const scaledW = iw * baseScale * photoScale;
                    const scaledH = ih * baseScale * photoScale;
                    const maxShiftX = Math.max(0, (scaledW - target) / 2);
                    const maxShiftY = Math.max(0, (scaledH - target) / 2);
                    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
                    // Sensibilité constante (px), puis clamp selon la marge réelle disponible.
                    const desiredShiftX = photoOffsetX * (target * 0.35);
                    const desiredShiftY = photoOffsetY * (target * 0.35);
                    const shiftX = clamp(desiredShiftX, -maxShiftX, maxShiftX);
                    const shiftY = clamp(desiredShiftY, -maxShiftY, maxShiftY);

                    return (
                      <Image
                        image={photoImg}
                        // Convention: Position X/Y > 0 déplace l'image vers la droite / vers le bas.
                        x={cx - target / 2 - (scaledW - target) / 2 + shiftX}
                        y={cy - target / 2 - (scaledH - target) / 2 + shiftY}
                        width={scaledW}
                        height={scaledH}
                        listening={false}
                      />
                    );
                  })()}
                </Group>
              )}

              {/* 2) Cadre AU-DESSUS (on ne découpe plus le centre) */}
              <FrameImage frame={frame} size={PROFILE_SIZE} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
