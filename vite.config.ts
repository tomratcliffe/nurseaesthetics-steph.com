import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { optimiseImages } from './plugins/optimise-images.ts';

// Served from the custom domain at the root, so the base path stays at "/".
export default defineConfig({
  base: '/',
  plugins: [react(), optimiseImages()],
  // Listen on all interfaces so phones and tablets on the same network can
  // load the site for real-device testing.
  server: { host: true },
  preview: { host: true },
});
