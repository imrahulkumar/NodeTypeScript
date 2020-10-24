import { Server } from './server';

let server = new Server().app;

let port = 5000;

server.listen(port, () => {

    console.log("Server is running")
})