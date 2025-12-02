import "./faro.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
        "http://localhost:5173",
        "https://webinkuy.vercel.app",
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
