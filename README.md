# WILDLIGHT — Project Showcase

Static research showcase for **WILDLIGHT — Environmental Audio Intelligence**.

- **Source Code Repository:** [github.com/brettleevector-art/wildlight-audio-ml](https://github.com/brettleevector-art/wildlight-audio-ml)
- **Technical Results Report:** [RESULTS.md](https://github.com/brettleevector-art/wildlight-audio-ml/blob/main/RESULTS.md)
- **Target Vercel Domain:** `https://wildlight-audio-ml.vercel.app`

## Overview

This website is a zero-dependency, static, research-grade showcase communicating the experimental findings, audio preprocessing pipeline, model comparisons, five-fold cross-validation results, and engineering architecture of the WILDLIGHT project.

## Architecture

- `index.html`: Semantic HTML5 structure with complete scientific facts, tables, diagrams, and accessibility markup.
- `styles.css`: Dark, premium design tokens, responsive typography, hairline layout, and accessibility features.
- `script.js`: Vanilla JS for reading progress bar, scroll spy, mobile drawer navigation, copy-to-clipboard, and chart lightbox.
- `assets/`: Real chart artifacts (`model_comparison_fold5.png`, `resnet18_five_fold_cv.png`) and SVG icons.
- `vercel.json`: Zero-config static deployment headers and caching rules.

## Local Preview

You can run any local static web server from this directory:

### Using Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Using Node:
```bash
npx serve .
```

## Vercel Deployment

1. Connect this repository or upload the static folder to [Vercel](https://vercel.com).
2. Framework Preset: `Other`.
3. Build Command: *None* (leave empty).
4. Output Directory: `.` (current directory / root).
5. Deploy.
