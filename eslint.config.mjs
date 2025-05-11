import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Kompatybilność z konfiguracjami z .eslintrc
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

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
      "**/src/generated/**",
    ],
  },
];

export default eslintConfig;
