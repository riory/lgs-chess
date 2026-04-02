import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // 1. Global Ignores
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/test/unit/**",
      "**/*.test.ts",
      "**/*.spec.ts",
    ],
  },
  // 2. Base configs (this automatically sets up the parser)
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // 3. Custom rules & overrides
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
      "require-await": "error",
    },
  }
);
