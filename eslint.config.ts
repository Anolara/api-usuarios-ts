import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.ts"],
    plugins: {},
    extends: ["plugin:@typescript-eslint/recommended"],
  },
]);
