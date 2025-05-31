import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

const htmlMinifyOptions = {
  collapseWhitespace: true,
  keepClosingSlash: false,
  removeComments: true,
  removeAttributeQuotes: true,
  caseSensitive: true,
  collapseBooleanAttributes: true,
  minifyJS: true,
  minifyCSS: true,
  useShortDoctype: true
};

export default defineConfig(({ mode }) => ({
  root: './',
  publicDir: 'public',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  css: {
    devSourcemap: mode === 'development'
  },
  server: {
    port: 5173,
    open: true,
    host: true
  },
  preview: {
    port: 5173,
    open: true
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: mode === 'production',
    sourcemap: mode === 'development',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html')
      },
      output: {
        chunkFileNames: mode === 'development' ? '[name].js' : '[name].[hash].js',
        entryFileNames: mode === 'development' ? '[name].js' : '[name].[hash].js',
        assetFileNames: assetInfo => {
          if (assetInfo.names.some(asset => asset.endsWith('.css'))) {
            return mode === 'development' ? '[name].css' : '[name].[hash].css';
          }
          return mode === 'development'
            ? 'assets/[name][extname]'
            : 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  plugins: [
    tsconfigPaths(),
    createHtmlPlugin({
      minify: mode === 'development' ? false : htmlMinifyOptions
    })
  ]
}));
