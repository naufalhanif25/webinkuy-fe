import { getWebInstrumentations, initializeFaro, UserActionInstrumentation } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export const faro = initializeFaro({
    url: import.meta.env.VITE_FARO_URL,
    app: {
        name: "WebinKuy",
        version: "1.0.0",
        environment: "production",
    }, 
    instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
        new UserActionInstrumentation(),
    ],
});