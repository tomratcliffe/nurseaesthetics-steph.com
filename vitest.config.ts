import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

// Reuses the app's Vite config, so image and CSS-module imports resolve in
// tests exactly as they do in the build. Kept separate from vite.config.ts so
// the build config carries no test concerns.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      // Real hashed class names, so nothing silently resolves to undefined.
      css: true,
      restoreMocks: true,
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
);
