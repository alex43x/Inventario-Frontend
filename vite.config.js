import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',  // 👈 Asegura rutas relativas
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  preview: { // 👈 Esto permite servir la app correctamente en producción
    historyApiFallback: true
  }
})
