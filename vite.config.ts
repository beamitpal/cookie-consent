import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  test: {
    ...configDefaults,
    globals: true, // Enables Jest-like globals (describe, it, expect)
    environment: "jsdom", // Required for React component testing
    setupFiles: ["./tests/setup.ts"], // Optional setup file
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "CookieConsent",
      fileName: (format) => `cookie-consent.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});