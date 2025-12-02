import { getWebInstrumentations, initializeFaro, UserActionInstrumentation } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export const faro = initializeFaro({
    url: "https://faro-collector-prod-ap-southeast-2.grafana.net/collect/3f07a4ab98e88085dc025d26eb150d8d",
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