import babel from '@rolldown/plugin-babel';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
    plugins: [
        devtools(),
        tanstackStart(),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
    resolve: { tsconfigPaths: true },
});

export default config;
