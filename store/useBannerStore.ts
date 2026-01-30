import { create } from "zustand";
import type { FrameId } from "@/frames";

export interface BannerState {
  // Photo (profil)
  photoDataUrl: string | null;
  photoScale: number;
  photoOffsetX: number; // -1 = gauche, 0 = centre, 1 = droite
  photoOffsetY: number; // -1 = haut, 0 = centre, 1 = bas

  // Cadre (bannière ronde)
  frameId: FrameId;

  // Actions
  setPhotoDataUrl: (url: string | null) => void;
  setPhotoScale: (scale: number) => void;
  setPhotoOffsetX: (x: number) => void;
  setPhotoOffsetY: (y: number) => void;
  setFrameId: (id: FrameId) => void;

  reset: () => void;
}

const defaultState = {
  photoDataUrl: null as string | null,
  photoScale: 1,
  photoOffsetX: 0,
  photoOffsetY: 0,
  frameId: "violet" as FrameId,
};

export const useBannerStore = create<BannerState>((set) => ({
  ...defaultState,

  setPhotoDataUrl: (photoDataUrl) => set({ photoDataUrl }),
  setPhotoScale: (photoScale) => set({ photoScale }),
  setPhotoOffsetX: (photoOffsetX) => set({ photoOffsetX }),
  setPhotoOffsetY: (photoOffsetY) => set({ photoOffsetY }),
  setFrameId: (frameId) => set({ frameId }),

  reset: () => set(defaultState),
}));

/** True si on a une photo pour autoriser le téléchargement */
export function hasMinimalContent(state: Pick<BannerState, "photoDataUrl">): boolean {
  return !!state.photoDataUrl;
}
