import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// import proxy from 'vite-plugin-proxy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        cors: true,
        open: true,
        proxy: {
            '/api': {
                target: 'https://9z6wbhg0afsd.xyz/',
                changeOrigin: true,
                ws: true,
                // rewrite:(path) => path.replace(/^\/api/,'')
            }

        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
