# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploy to Netlify

This project is pre-configured for Netlify with:

- `netlify.toml` for build/publish settings
- `public/_redirects` for React Router SPA fallback

### Option 1: Deploy from Git (recommended)

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify, click **Add new site** → **Import an existing project**.
3. Select your repo and use:
	- Build command: `npm run build`
	- Publish directory: `dist`
4. Deploy.

### Option 2: Manual deploy

```bash
npm install
npm run build
```

Then drag-and-drop the generated `dist` folder into Netlify Deploys.
