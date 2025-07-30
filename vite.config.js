import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // React 18 support
    jsxRuntime: 'automatic',
  })],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MCPPlayground',
      formats: ['es', 'umd'],
      fileName: (format) => `mcp-playground.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    target: 'es2015' // Ensure modern JS support
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
})
