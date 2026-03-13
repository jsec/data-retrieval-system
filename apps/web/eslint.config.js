import config from '@jarsec/eslint-config/react';

export default [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        }
    }
]
