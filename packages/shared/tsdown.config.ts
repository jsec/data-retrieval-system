import { defineConfig } from 'tsdown';

export default defineConfig([
    {
        dts: true,
        entry: 'src/index.ts',
        platform: 'neutral',
    },
    {
        dts: true,
        entry: 'src/config/index.ts',
        outDir: 'dist/config',
        platform: 'neutral',
    },
    {
        dts: true,
        entry: 'src/contract/index.ts',
        outDir: 'dist/contract',
        platform: 'neutral',
    },
]);
