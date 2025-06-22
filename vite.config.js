import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        jsxImportSource: 'react',
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          ],
        },
      }),
      svgr(),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
      },
      extensions: ['.js', '.jsx', '.json', '.mjs'],
    },

    server: {
      port: 3000,
      strictPort: true,
      open: !process.env.CI,
      host: true,
    },

    preview: {
      port: 4173,
      open: !process.env.CI,
    },

    build: {
      outDir: 'dist',
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('bootstrap')) {
                return 'vendor-bootstrap';
              }
              return 'vendor-lib';
            }
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react/jsx-runtime',
      ],
      exclude: [],
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
