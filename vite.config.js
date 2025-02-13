import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',  // 👈 Asegura rutas relativas
  build: {
    outDir: '../electron/frontend-dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  preview: { // 👈 Esto permite servir la app correctamente en producción
    historyApiFallback: true
  }
})

