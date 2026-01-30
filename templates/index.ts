import type { TemplateId } from "@/store/useBannerStore";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
  accentColor: string;
  /** Optional: glow/shadow for neon */
  titleShadow?: string;
  subtitleShadow?: string;
}

export const templates: Record<TemplateId, TemplateConfig> = {
  classic: {
    id: "classic",
    name: "Classic",
    backgroundColor: "#1a1a2e",
    titleColor: "#e2e8f0",
    subtitleColor: "#94a3b8",
    accentColor: "#8b5cf6",
  },
  neon: {
    id: "neon",
    name: "Neon",
    backgroundColor: "#0f0f1a",
    titleColor: "#e0e7ff",
    subtitleColor: "#a5b4fc",
    accentColor: "#818cf8",
    titleShadow: "0 0 20px rgba(129, 140, 248, 0.8), 0 0 40px rgba(129, 140, 248, 0.4)",
    subtitleShadow: "0 0 10px rgba(165, 180, 252, 0.6)",
  },
};

export function getTemplate(id: TemplateId): TemplateConfig {
  return templates[id];
}
