// @ts-check

import reactConfig from '@jarsec/eslint-config/react';
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";

/**
 * @type {import("eslint").Linter.Config[]}
 **/
export const config = [
    ...reactConfig,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
