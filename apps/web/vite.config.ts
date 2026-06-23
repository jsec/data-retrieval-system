import babel from '@rolldown/plugin-babel';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
    plugins: [
        devtools(),
        tanstackRouter(),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
    resolve: { tsconfigPaths: true },
});

export default config;
