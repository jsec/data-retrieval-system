//  @ts-check

import { config } from '@drs/eslint-config/base';
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...config,
    ...tanstackConfig,
    {
        rules: {
            'import/no-cycle': 'off',
            'import/order': 'off',
            'sort-imports': 'off',
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/require-await': 'off',
            'pnpm/json-enforce-catalog': 'off',
        },
    },
    {
        ignores: ['eslint.config.js', 'prettier.config.js'],
    },
];
