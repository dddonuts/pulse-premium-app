# Pulse Premium

Générateur de bannières HD (PNG) avec une interface dark premium type Tikstar : carte centrale, accents violet/bleu, sliders et fond réseau.

## Prérequis

- **Node.js** 18+ (recommandé 20+)
- **npm** ou **yarn**

## Installation

```bash
# Cloner ou se placer dans le dossier du projet
cd "generateur bannieres"

# Installer les dépendances
npm install
```

## Démarrage

```bash
# Mode développement (hot reload)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Build production

```bash
npm run build
npm start
```

## Stack technique

- **Next.js 14** (App Router)
- **Tailwind CSS** (style dark premium, violet)
- **react-konva** + **konva** (canvas bannière, export PNG HD)
- **Zustand** (state global)
- **TypeScript** (typage strict)

## Fonctionnalités MVP

- **Photo de profil TikTok (rond)** :
  - Upload d’une image (photo)
  - Choix d’un **cadre/bannière** (noms de couleurs)
  - Zoom + position X/Y
  - Réinitialiser, Ajuster (auto-centrage), Télécharger (PNG rond)

L’export PNG utilise `stage.toDataURL({ pixelRatio: 3 })` pour une résolution HD.

## Cadres (bannières rondes)

Place tes PNG dans `public/frames/` (voir `public/frames/PLACE_IMAGES_HERE.md`).
Les options sont nommées par **couleur** dans l’UI (Violet, Or, Turquoise…).

## Structure du projet

```
├── app/
│   ├── layout.tsx      # Layout global, police Inter
│   ├── page.tsx        # Page d’accueil
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── EditorCard.tsx
│   ├── BannerStage.tsx
│   ├── Controls.tsx
│   ├── BackgroundNetwork.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Slider.tsx
├── store/
│   └── useBannerStore.ts
├── frames/
│   └── index.ts        # Cadres (couleurs) -> /public/frames/*.png
├── templates/
│   └── index.ts        # Config Classic / Neon
└── utils/
    ├── exportPng.ts
    └── loadImage.ts
```

## Licence

Usage libre pour le projet personnel / démo.
