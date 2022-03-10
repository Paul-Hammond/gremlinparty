import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import * as socketIO from 'socket.io';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.dirname(__dirname);
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
