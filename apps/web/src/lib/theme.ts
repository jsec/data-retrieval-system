import type { MantineColorsTuple } from '@mantine/core';

import { createTheme } from '@mantine/core';

const palette: MantineColorsTuple = [
    '#ffe8ec',
    '#ffd1d7',
    '#f6a1ab',
    '#f06d7d',
    '#eb4357',
    '#e8293f',
    '#e8002d',
    '#cf0028',
    '#b80022',
    '#a0001d',
];

export const theme = createTheme({
    colors: { palette },
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    headings: {
        fontWeight: '800',
        sizes: {
            h1: { fontSize: '30px', lineHeight: '1.1' },
            h3: { fontSize: '15px', fontWeight: '700', lineHeight: '1.2' },
        },
    },
    primaryColor: 'palette',
});
