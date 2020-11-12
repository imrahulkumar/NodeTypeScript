import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfiguration(): void;
    configureBodyParser(): void;
    connectMongodb(): void;
    setRoutes(): void;
    error404Handler(): void;
    hanleErrors(): void;
}
