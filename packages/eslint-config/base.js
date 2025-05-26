import myConfig from '@jarsec/eslint-config';
import turboPlugin from 'eslint-plugin-turbo';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 *
 */
const config = [
    ...myConfig,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'warn',
        },
    },
    {
        ignores: ['dist/**'],
    },
];

export default config;
