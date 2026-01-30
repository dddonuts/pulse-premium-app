import type { Stage } from "konva";

const HD_PIXEL_RATIO = 3;

/**
 * Exporte le stage Konva en PNG HD (pixelRatio 3).
 * @param stageRef - ref du stage Konva (Stage from react-konva)
 * @param filename - nom du fichier téléchargé
 */
export function exportStageToPng(
  stageRef: React.RefObject<Stage | null>,
  filename: string = "pulse-premium-banner.png"
): void {
  const stage = stageRef.current;
  if (!stage) return;

  const dataUrl = stage.toDataURL({
    pixelRatio: HD_PIXEL_RATIO,
    mimeType: "image/png",
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
