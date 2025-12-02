import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        sentryVitePlugin({
            org: process.env.VITE_SENTRY_ORG,
            project: process.env.VITE_SENTRY_PROJECT,
            authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
            sourcemaps: {
                assets: "./dist/assets",
            },
        }),
    ],
    build: {
        sourcemap: true,
    },
    server: {
        allowedHosts: true,
    },
});
