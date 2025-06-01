import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: './background.js',   // <-- your content script entry point
      formats: ['iife'],           // bundle as a single script without module syntax
      name: 'ContentScript', // global variable name for the content script
      fileName: () => 'background.js' // output filename
    },
    rollupOptions: {
      output: {
        // Prevent Vite from injecting default exports interop code
        inlineDynamicImports: true,
      }
    }
  }
});