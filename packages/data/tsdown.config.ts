// eslint-disable-next-line n/no-unpublished-import
import { defineConfig } from 'tsdown';

export default defineConfig({
    dts: true,
    entry: [
        'src/connection.ts',
    ],
});
