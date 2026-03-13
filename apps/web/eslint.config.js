import config from '@jarsec/eslint-config/react';

export default [
    { ignores: ['dist/**', 'eslint.config.js', 'src/routeTree.gen.ts'] },
    ...config,
    {
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        }
    }
]
