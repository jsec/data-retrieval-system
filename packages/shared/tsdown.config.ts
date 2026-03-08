import { defineConfig } from 'tsdown';

export default defineConfig([
    {
        dts: true,
        entry: 'src/index.ts',
        platform: 'neutral',
    },
    {
        dts: true,
        entry: 'src/types/index.ts',
        outDir: 'dist/types',
        platform: 'neutral',
    },
]);
