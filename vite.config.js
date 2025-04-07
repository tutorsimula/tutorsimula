import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.glb'],
  plugins: [react()],
  server: {
    host: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    },
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    include: ['pyodide', '@react-three/fiber', '@uiw/react-codemirror'],
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          pyodide: ['pyodide'],
          codemirror: ['@uiw/react-codemirror', '@codemirror/lang-python'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '/pyodide': resolve(__dirname, 'node_modules/pyodide'),
    },
    dedupe: ['vite'], // Prevent duplicate Vite instances
  },
});