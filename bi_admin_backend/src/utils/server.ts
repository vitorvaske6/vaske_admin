
import express, { Request, Response } from "express";
import routes from "../routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import deserializeUser  from '../middleware/deserializeUser';
import config from "../../config/deafult"
import { startMetricsServer, restResponseTimeHistogram, dbResponseTimeHistogram } from './metrics';
import responseTime from "response-time";
import swaggerDocs from "./swagger";

function createServer(){
    const app = express();

    app.use(cors({
        origin: `${config.uiServer.host}:${config.uiServer.port}`,
        credentials: true,
    }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(deserializeUser);
    app.use(responseTime((req: Request, res: Response, time: number) =>{
        if(req?.route?.path){
            restResponseTimeHistogram.observe({
                method: req.method,
                route: req.route.path,
                status_code: res.statusCode
            }, time * 1000);
        }
    }));

    routes(app);
    startMetricsServer();
    swaggerDocs(app, config.server.port);

    return app
} 

export default createServer;