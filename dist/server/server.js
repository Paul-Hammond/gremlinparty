import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import * as socketIO from 'socket.io';
import GremlinPlayer from './player/gremlinplayer.js';
import GremlinWorld from './gremlinworld.js';
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
        this.connectedGremlins = new Array();
        this.gremlinWorld = new GremlinWorld();
    }
    start() {
        this.server.listen(this.port);
        console.log(`server listening on port ${this.port}`);
        this.io.on('connection', (socket) => {
            console.log(`client connection: ${socket.id}`);
            socket.on('gcNewUser', (name) => {
                this.connectedGremlins.push(new GremlinPlayer(name, socket.id));
                console.log(`a gremlin has joined with the name ${name}.`);
                console.log(`network size: ${this.connectedGremlins.length}`);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });
            socket.on('disconnect', () => {
                const fallenGremlin = this.getGremlinFromID(socket.id);
                console.log(`${fallenGremlin.getUsername()} disconnected.`);
                this.connectedGremlins.splice(this.getIndexFromGremlin(fallenGremlin), 1);
                console.log(`network size: ${this.connectedGremlins.length}`);
            });
        });
    }
    getIndexFromGremlin(gremlin) {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlin.getGremlinID()) {
                return i;
            }
        }
        return NaN;
    }
    getGremlinFromIndex(index) {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == this.connectedGremlins[index].getGremlinID()) {
                return this.connectedGremlins[i];
            }
        }
    }
    getGremlinFromID(gremlinID) {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlinID) {
                return this.connectedGremlins[i];
            }
        }
    }
}
new GremlinServer(29070).start();
