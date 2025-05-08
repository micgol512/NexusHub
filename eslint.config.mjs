import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Kompatybilność z konfiguracjami z .eslintrc
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const eslintConfig = [
  // Rozszerzenie konfiguracji Next.js i TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignorowane globalnie katalogi
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/coverage/**",
      "**/build/**",
    ],
  },

  // Zasady dla kodu źródłowego (frontend)
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Dodaj własne reguły ESLinta tutaj
      "@next/next/no-img-element": "off",
    },
  },

  // Zasady dla plików Prisma (np. seed.ts)
  {
    files: ["prisma/**/*.ts"],
    rules: {
      // Możesz np. wyłączyć React-specific linting tutaj
      "react/react-in-jsx-scope": "off",
    },
  },

  // Zasady dla plików testowych (opcjonalnie)
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      // Przykład: dopuszczalne console.log w testach
      "no-console": "off",
    },
  },
];

export default eslintConfig;
