import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@assets': '/src/assets',
            '@store': '/src/store',
            '@hooks': '/src/hooks',
            '@utils': '/src/utils',
            "@interceptors": "/src/interceptors",
        },
    },
})
