import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
    plugins: [devtools(), tanstackRouter(), viteReact()],
    resolve: {
        dedupe: ['react', 'react-dom'],
        tsconfigPaths: true,
    },
});

export default config;
