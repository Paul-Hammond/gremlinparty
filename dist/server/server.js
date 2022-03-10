import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import * as socketIO from 'socket.io';
const PORT = process.env.PORT || 29070;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.dirname(__dirname);
// //(3/9/22) cry havoc and let slip the dogs of server init functions
// const expressApp = express();
// const server: http.Server = http.createServer(expressApp);
// const io: socketIO.Server = new socketIO.Server(server);
// expressApp.use(express.static(path.join(distPath, 'public')));
// server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
// io.on('connection', (socket: socketIO.Socket) => {
//     console.log('client connection: ' + socket.id);
//     socket.on('hello', (msg) => {
//         console.log(`${socket.id} sent ${msg}`);
//     });
//     socket.on('disconnect', () => {
//         console.log(`${socket.id} disconnected`);
//     });
// });
class GremlinServer {
    constructor(port) {
        this.port = process.env.PORT || port;
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));
        this.server = new http.Server(expressApp);
        this.io = new socketIO.Server(this.server);
        this.io.on('connection', (socket) => {
            console.log(`client connection: ${socket.id}`);
            socket.on('disconnect', () => {
                console.log(`client disconnect: ${socket.id}`);
            });
        });
    }
    start() {
        this.server.listen(this.port);
        console.log(`server listening on port ${this.port}`);
    }
}
new GremlinServer(29070).start();
