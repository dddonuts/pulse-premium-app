"use client";

import { useRef } from "react";
import type { Stage } from "konva";
import { useBannerStore, hasMinimalContent } from "@/store/useBannerStore";
import { exportStageToPng } from "@/utils/exportPng";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { frames, getFrame, type FrameId } from "@/frames";

interface ControlsProps {
  stageRef: React.RefObject<Stage | null>;
}

export function Controls({ stageRef }: ControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    photoDataUrl,
    photoScale,
    photoOffsetX,
    photoOffsetY,
    frameId,
    setPhotoDataUrl,
    setPhotoScale,
    setPhotoOffsetX,
    setPhotoOffsetY,
    setFrameId,
    reset,
  } = useBannerStore();

  const canDownload = hasMinimalContent({ photoDataUrl });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleReset = () => {
    reset();
    fileInputRef.current?.form?.reset();
  };

  const handleAutoCenter = () => {
    useBannerStore.setState({ photoOffsetX: 0, photoOffsetY: 0 });
  };

  const handleDownload = () => {
    exportStageToPng(stageRef);
  };

  const frameOptions = Object.keys(frames) as FrameId[];

  return (
    <div className="space-y-6">
      {/* Photo upload */}
      <div>
        <p className="text-sm font-medium text-slate-300 mb-2">Importez votre photo</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="block cursor-pointer">
          <Button
            type="button"
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Choisir une image
          </Button>
        </label>
      </div>

      {/* Aperçu: handled by parent (BannerStage) */}

      {/* Ajustez votre photo de profil */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-slate-300">Ajustez votre photo (TikTok)</p>

        <Slider
          label="Zoom photo"
          value={photoScale}
          min={0.6}
          max={2}
          step={0.02}
          onChange={setPhotoScale}
        />

        <Slider
          label="Position X"
          value={photoOffsetX}
          min={-1}
          max={1}
          step={0.02}
          onChange={setPhotoOffsetX}
        />

        <Slider label="Position Y" value={photoOffsetY} min={-1} max={1} step={0.02} onChange={setPhotoOffsetY} />

        <div>
          <label className="block text-xs text-slate-400 mb-1">Couleur du cadre</label>
          <select
            value={frameId}
            onChange={(e) => setFrameId(e.target.value as FrameId)}
            className="w-full rounded-lg bg-slate-800/80 border border-premium-border px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-premium-accent/50"
          >
            {frameOptions.map((id) => (
              <option key={id} value={id}>
                {getFrame(id).name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="ghost" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button variant="secondary" onClick={handleAutoCenter}>
            Ajuster
          </Button>
          <Button
            variant="primary"
            onClick={handleDownload}
            disabled={!canDownload}
          >
            Télécharger (PNG rond)
          </Button>
        </div>
      </div>
    </div>
  );
}
