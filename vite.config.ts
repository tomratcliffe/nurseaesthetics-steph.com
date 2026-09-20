import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The root base is for `npm run dev` only. The production build is served
// from the GitHub Pages project path, so `npm run build` passes
// --base=/nurseaesthetics-steph.com/ (see package.json). Drop that flag from
// the build and preview scripts once the custom domain is live, at which
// point the site is served from the root again.
export default defineConfig({
  base: '/',
  plugins: [react()],
  // Listen on all interfaces so phones and tablets on the same network can
  // load the site for real-device testing.
  server: { host: true },
  preview: { host: true },
});
