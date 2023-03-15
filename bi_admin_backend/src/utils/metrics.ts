import express from "express";
import client from "prom-client";
import log from "./logger";
import config from "../../config/deafult"

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API Response time in seconds",
    labelNames: ["method", "route", "status_code"]
});

export const dbResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database Response time in seconds",
    labelNames: ["operation", "success"]
});

export function startMetricsServer(){

    const collectDefaultMetrics = client.collectDefaultMetrics

    collectDefaultMetrics();

    app.get("/metrics", async(req, res) =>{
        res.set("Content-Type", client.register.contentType);
        return res.send(await client.register.metrics());
    })

    app.listen(9100, () =>{
        log.info(`Metrics server started at ${config.metricsServer.host}:${config.metricsServer.port}`);
    })
}