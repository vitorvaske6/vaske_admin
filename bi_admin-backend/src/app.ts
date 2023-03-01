import config from "../config/deafult";
import connect from "./utils/connet";
import logger from "./utils/logger";
import createServer from "./utils/server";

const server = config.server;
const app = createServer();

app.listen(server.port, async () =>{
    logger.info(`App is running at ${server.host}:${server.port}`)
    await connect();
});