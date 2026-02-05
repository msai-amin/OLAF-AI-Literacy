# Forestry AI Literacy Course

Interactive learning labs for professional foresters to understand AI applications in forestry.

## Overview

This application provides hands-on simulations and interactive modules covering:
1. **Computer Vision** - Understanding confidence thresholds and false positives
2. **Prediction** - Fire spread simulation with environmental variables
3. **Generative AI** - Report generation and detecting hallucinations
4. **Data Quality** - Training models and understanding GIGO (Garbage In, Garbage Out)
5. **3D LiDAR** - Point cloud visualization and semantic segmentation
6. **Machine Learning** - Core ML algorithms with interactive widgets (decision trees, regression, clustering)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- **Routing:** Path-based routes (`/`, `/ml`, `/vision`, `/prediction`, `/genai`, `/data-quality`, `/lidar`, `/quiz`, `/glossary`) via React Router. Labs are lazy-loaded except the home page.
- **Progress:** Stored in `localStorage` under key `olaf-forestry-ai-progress`. Schema: `{ completedModules: string[], quizAttempts: { score: number, date: string }[], lastRoute?: string }`. See `src/context/ProgressContext.jsx`.
- **Data:** Quiz questions live in `src/data/quizQuestions.js` (export `questionPools` and `selectRandomQuestions`).

```
├── src/
│   ├── components/         # Lab and UI components
│   ├── context/            # ProgressContext (progress persistence)
│   ├── data/               # quizQuestions.js
│   ├── guides/             # Lab guide content
│   ├── test/               # Vitest setup
│   ├── utils/              # e.g. visionStats.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

## How to Add a New Lab

1. Create a new component in `src/components/` (e.g. `NewLab.jsx`).
2. In `App.jsx`, add a lazy import: `const NewLab = lazy(() => import('./components/NewLab').then(m => ({ default: m.NewLab })));`
3. Add a route in `ROUTES` and a `<Route path="/new-lab" element={<ModuleLayout path="/new-lab"><NewLab /></ModuleLayout>} />` (or without ModuleLayout if it is not a module).
4. Optionally add a link from `IntroLab.jsx` to `/new-lab`.

## How to Add Quiz Questions

Edit `src/data/quizQuestions.js`. Add entries to the appropriate key in `questionPools` (e.g. `ml`, `vision`, `prediction`, `genai`, `dataQuality`, `lidar`). Each question is `{ question: string, options: string[], correct: number, module: string }`. The quiz picks 5 questions per module at random.

## Technologies

- **React 18** - UI framework
- **React Router** - URL routing and shareable links
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library for LiDAR visualization
- **Vitest** - Unit tests

## Development

The application uses Vite for fast development with Hot Module Replacement (HMR). Run `npm run dev`, then open the URL shown. Run tests with `npm run test` or `npm run test:run`.

## License

This project is designed for educational purposes in forestry AI literacy training.

