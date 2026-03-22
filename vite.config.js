/* eslint-env node */
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || "/Pathfinder_client",
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  };
});
