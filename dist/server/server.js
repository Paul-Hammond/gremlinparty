import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import * as socketIO from 'socket.io';
import GremlinPlayer from './player/gremlinplayer.js';
import GremlinWorld from './world/gremlinworld.js';
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
                console.log(`+++ ${this.connectedGremlins.length} network size. ${name} connected.`);
                this.gremlinWorld.addGremlin(name);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });
            socket.on('disconnect', () => {
                const fallenGremlin = this.getGremlinFromID(socket.id);
                this.gremlinWorld.removeGremlin();
                console.log(`--- ${this.connectedGremlins.length - 1} network size. ${fallenGremlin.getUsername()} disconnected.`);
                this.connectedGremlins.splice(this.getIndexFromGremlin(fallenGremlin), 1);
            });
        });
        setInterval(() => {
            console.log(`emitting ${GremlinWorld.getWorldUpdatePackage()}`);
            if (this.connectedGremlins.length >= 1) {
                this.io.emit('gsWorldUpdatePackage', GremlinWorld.getWorldUpdatePackage());
            }
        }, 1000);
        //setInterval(this.emitWorldPackage, 1000, GremlinWorld.getWorldUpdatePackage());
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
    getUsernamefromGremlinID(gremlinID) {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlinID) {
                return this.connectedGremlins[i].getUsername();
            }
        }
        return 'NotAGremlin';
    }
}
const gs = new GremlinServer(29070);
gs.start();
