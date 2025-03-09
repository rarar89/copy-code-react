import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import preserveUseClientDirective from 'rollup-plugin-preserve-use-client';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      include: ['src'],
      tsconfigPath: './tsconfig.app.json'
    }),
    preserveUseClientDirective()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CopyCodeReact',
      fileName: 'copy-code-react'
    },
    rollupOptions: {
      external: ["react", /^react\/.*/, "react-dom", /react-dom\/.*/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
}); 