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

```
├── src/
│   ├── components/
│   │   ├── icons/          # SVG icon components
│   │   ├── guides/          # Lab guide content components
│   │   ├── IntroLab.jsx     # Home/introduction module
│   │   ├── VisionLab.jsx    # Computer vision simulator
│   │   ├── PredictiveLab.jsx # Fire prediction simulator
│   │   ├── GenAILab.jsx     # Generative AI report generator
│   │   ├── DataLab.jsx      # Data quality training module
│   │   ├── LidarLab.jsx     # 3D LiDAR point cloud visualization
│   │   ├── MLLab.jsx        # Machine learning interactive widgets
│   │   └── LabGuideModal.jsx # Reusable modal component
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and Tailwind directives
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite build configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library for LiDAR visualization

## Development

The application uses Vite for fast development with Hot Module Replacement (HMR). Changes to components will automatically refresh in the browser.

## License

This project is designed for educational purposes in forestry AI literacy training.

