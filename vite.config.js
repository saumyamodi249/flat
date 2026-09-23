import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// Ensure user real-location toggle images are copied to public/UI IMG
try {
  const src3 = 'C:/Users/saumy/.gemini/antigravity-ide/brain/a69eef7b-1908-4e6e-a1cf-0df8e7b44b69/.user_uploaded/media_1790150740687.png'
  const src4 = 'C:/Users/saumy/.gemini/antigravity-ide/brain/a69eef7b-1908-4e6e-a1cf-0df8e7b44b69/.user_uploaded/media_1790150743891.png'
  const outDir = path.resolve('public/UI IMG')
  if (fs.existsSync(src3)) {
    fs.copyFileSync(src3, path.join(outDir, 'real_map_toggle.png'))
  }
  if (fs.existsSync(src4)) {
    fs.copyFileSync(src4, path.join(outDir, 'real_sat_toggle.png'))
  }
} catch (err) {
  console.warn('Could not copy user toggle images:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

