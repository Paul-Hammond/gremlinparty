import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

import * as socketIO from 'socket.io';

//import GremlinMessage from '../common/commongremlin.js';



const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);

class GremlinServer {
    private server: http.Server;
    private port: string | number;
    private io: socketIO.Server;

    constructor(port: number) {
        this.port = process.env.PORT || port; 
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.server = new http.Server(expressApp);
        this.io = new socketIO.Server(this.server);

        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log(`client connection: ${socket.id}`);

            socket.on('gremlinmessage', this.handleGreetnig);

            socket.on('disconnect', () => {
                console.log(`client disconnect: ${socket.id}`);
            });
        });
    }

    public start() {
        this.server.listen(this.port);
        console.log(`server listening on port ${this.port}`);
    }

    private handleGreetnig(/*msg: GremlinMessage*/) {
        //console.log(`${msg.senderID} said ${msg.contents}`);
    }

}

new GremlinServer(29070).start();