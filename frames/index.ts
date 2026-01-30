export type FrameId =
  | "violet"
  | "or"
  | "rose"
  | "bleu"
  | "multicolor"
  | "original";

export interface FrameConfig {
  id: FrameId;
  name: string; // Nom affiché (couleur)
  src: string; // Chemin dans /public
  /** 0..1, 0.5 = centré, 1 = plus bas (descend le cadrage) */
  cropYBias?: number;
}

export const frames: Record<FrameId, FrameConfig> = {
  violet: { id: "violet", name: "Violet", src: "/frames/violet.png.png" },
  or: { id: "or", name: "Or", src: "/frames/or.png.png" },
  rose: { id: "rose", name: "Rose", src: "/frames/rose.png.png" },
  // Le cadre bleu est un peu "haut" -> on descend le crop
  // NOTE: sur ce fichier, croper "plus bas" fait remonter le design.
  // Donc pour recentrer (descendre visuellement), on crope plus haut.
  bleu: { id: "bleu", name: "Bleu", src: "/frames/bleu.png.png", cropYBias: 0.44 },
  multicolor: { id: "multicolor", name: "Multicolore", src: "/frames/multicolor.png.png" },
  original: { id: "original", name: "Original", src: "/frames/original.png.png" },
};

export function getFrame(id: FrameId): FrameConfig {
  return frames[id];
}

