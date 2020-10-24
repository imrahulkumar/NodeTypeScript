import * as  express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable } from './environments/env';
import UserRouter from './routers/UserRouter';

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
    }

    setConfiguration() {
        this.setMongodb()
    }

    setMongodb() {
        let dataBaseUrl = getEnvironmentVariable().db_url;
        mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("mongodb is connect")
        }).catch((err) => {
            console.log(err);
        })
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter);
    }
}