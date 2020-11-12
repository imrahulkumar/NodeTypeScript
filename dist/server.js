"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environments/env");
const Jobs_1 = require("./jobs/Jobs");
const CommentRouter_1 = require("./routers/CommentRouter");
const PostRouter_1 = require("./routers/PostRouter");
const UserRouter_1 = require("./routers/UserRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        // To handle the req url which does not exist. 
        this.error404Handler();
        // To handle the error of each api.
        this.hanleErrors();
    }
    setConfiguration() {
        this.connectMongodb();
        this.configureBodyParser();
        Jobs_1.Jobs.runRequiredJobs();
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    connectMongodb() {
        let dataBaseUrl = env_1.getEnvironmentVariable().db_url;
        mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("mongodb is connect");
        }).catch((err) => {
            console.log(err);
        });
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: '404'
            });
        });
    }
    //Its a special type of middleware which has error as first argument.
    hanleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
