//  @ts-check

import { config } from '@drs/eslint-config/react';

export default [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/require-await': 'off',
            'unicorn/filename-case': 'off',
        },
    },
    {
        ignores: ['eslint.config.js', 'prettier.config.js'],
    },
];
