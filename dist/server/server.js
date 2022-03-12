import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import * as socketIO from 'socket.io';
//(3/12/22) a ConnectedClient is a thin tuple, it has a username and a gremlinID, that's it
import ConnectedClient from './player/connectedclient.js';
//(3/12/22) does most of the heavy lifting for the game
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
                this.connectedGremlins.push(new ConnectedClient(socket.id, name));
                console.log(`+++ ${this.connectedGremlins.length} network size. ${name} joined the gremlin party.`);
                this.gremlinWorld.addGremlin(socket.id, name);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });
            socket.on('disconnect', () => {
                const fallenGremlinCC = this.getGremlinFromID(socket.id);
                if (!fallenGremlinCC) {
                    console.log(`user ${socket.id} disconnected without joining the gremlin party`);
                }
                else {
                    console.log(`--- ${this.connectedGremlins.length - 1} network size. ${fallenGremlinCC.getUsername()} disconnected.`);
                    this.gremlinWorld.removeGremlinFromID(socket.id);
                    this.connectedGremlins.splice(this.getIndexFromGremlin(fallenGremlinCC), 1);
                }
            });
        });
        //(3/12/22) effectively the GremlinServer update function. emits the gsGremlinPackage message
        //x times a second to all connected clients 
        setInterval(() => {
            if (this.connectedGremlins.length >= 1) {
                console.log(`connected gremlins: ${this.connectedGremlins.length}`);
                //current gremlin package = new package()
                const currentPackage = this.gremlinWorld.createGremlinWorldPackage();
                //emit (current gremlin package)
                //make sure current package is deleted/wiped
                this.io.emit('gsGremlinPackage', currentPackage);
            }
        }, 200);
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
