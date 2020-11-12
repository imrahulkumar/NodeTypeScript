"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let server = new server_1.Server().app;
let port = 5000;
server.listen(port, () => {
    console.log("Server is running at 5000");
});
