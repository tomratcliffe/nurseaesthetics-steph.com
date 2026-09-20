import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served from a custom domain, so the base path stays at the root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  // Listen on all interfaces so phones and tablets on the same network can
  // load the site for real-device testing.
  server: { host: true },
  preview: { host: true },
});
