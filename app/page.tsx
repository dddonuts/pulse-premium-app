import dynamic from "next/dynamic";
import { Header } from "@/components/Header";

const EditorCard = dynamic(
  () => import("@/components/EditorCard").then((mod) => mod.EditorCard),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-4xl mx-auto rounded-2xl border border-premium-border bg-premium-card/70 backdrop-blur-card shadow-card p-6 md:p-8">
        <p className="text-slate-300 text-sm font-medium">Chargement du générateur…</p>
        <p className="text-slate-500 text-xs mt-1">
          Si ça reste bloqué, il y a probablement une erreur navigateur (Konva).
        </p>
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-8 md:py-12 flex flex-col items-center">
      <Header />
      <EditorCard />
    </main>
  );
}
