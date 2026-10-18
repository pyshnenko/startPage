import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep the output directory compatible with the existing static-host deployment.
  build: { outDir: 'build', emptyOutDir: true },
  server: { host: '0.0.0.0' },
});
