import mongoose from "mongoose";
import config from "../../config/deafult";
import logger from"./logger";

async function connect(){
    const server = config.server

    try{
        await mongoose.connect(server.dbUri)
        logger.info('Connected to DB');
    } catch(e){
        logger.error('Could not connect to DB');
        process.exit(1);
    }
}
export default connect