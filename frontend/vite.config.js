import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite 설정 파일
export default defineConfig({
  plugins: [
    react(),
    // Tailwind CSS v4 Vite 플러그인 - CSS 빌드 시 Tailwind 유틸리티 클래스를 처리
    tailwindcss(),
  ],
  server: {
    // 프록시 설정: 프론트(5173)에서 /api 요청을 백엔드(8080)로 전달
    // 개발 시 CORS 문제 없이 백엔드 API를 호출할 수 있게 해줌
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
