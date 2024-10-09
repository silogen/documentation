import react from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    // setupFiles: ['__tests__/setup.ts'],
    mockReset: true,
    globals: true,
    environment: "jsdom",
  },
});
