import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        ...(mode === 'analyze'
            ? [
                  visualizer({
                      filename: 'bundle-stats/stats.html',
                      gzipSize: true,
                      brotliSize: true,
                      open: false,
                  }),
              ]
            : []),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) {
                        return undefined
                    }

                    if (id.includes('react-dom') || id.includes('/react/')) {
                        return 'vendor-react'
                    }

                    if (
                        id.includes('@reduxjs') ||
                        id.includes('react-redux') ||
                        id.includes('redux-persist') ||
                        id.includes('/redux/')
                    ) {
                        return 'vendor-redux'
                    }

                    return 'vendor-misc'
                },
            },
        },
    },
}))
