# JOCKY Compiler Playground

A frontend dashboard that demonstrates the JOCKY language compiler
workflow: an editable source panel, an animated compiler pipeline, a
generated-output viewer, and a compilation history — built with React
and Vite for a hackathon demo.

**This is a frontend simulation only.** No code is parsed, executed,
or run, and no files are created on the server or the visitor's
machine. `src/services/compilerService.js` returns cosmetically
generated C-style text and random display IDs; it is deliberately
isolated so it can later be swapped for a real, authorized backend
without touching any UI component.

## Project structure

```
src/
├── components/
│   ├── Header.jsx        Top bar: brand mark + session build count
│   ├── CodeEditor.jsx    Editable source panel with line numbers
│   ├── OutputPanel.jsx   Idle / compiling / generated-output states
│   ├── CompileButton.jsx Compile trigger with loading state
│   ├── BuildHistory.jsx  List of past simulated builds
│   └── Pipeline.jsx      Animated compiler stage visualization
├── services/
│   └── compilerService.js  Frontend-only compile simulation
├── utils/
│   ├── generator.js      Random ID / timestamp helpers
│   └── highlight.js      Safe tokenizer for code highlighting
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the app locally (with hot reload) at `http://localhost:5173`:

```bash
npm run dev
```

Create a production build (outputs to `dist/`):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploying to Netlify

This project is ready to deploy as-is:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

`netlify.toml` already sets both of these, plus a SPA fallback
redirect, so you can either:

1. **Drag-and-drop:** run `npm run build` locally, then drag the
   generated `dist/` folder into the Netlify dashboard, or
2. **Git-based deploy:** push this repo to GitHub/GitLab/Bitbucket and
   connect it in Netlify — it will pick up the build command and
   publish directory from `netlify.toml` automatically.

## Notes

- The default source snippet computes a `key` value in the browser via
  a small, cosmetic text scan (not a real interpreter) so the
  simulated output panel feels connected to what's in the editor.
- Animations respect `prefers-reduced-motion`.
