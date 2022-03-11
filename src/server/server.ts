import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

import * as socketIO from 'socket.io';

import GremlinPlayer from './player/gremlinplayer.js';
import GremlinWorld from './gremlinworld.js';



const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);

class GremlinServer {
    private server: http.Server;
    private port: string | number;
    private io: socketIO.Server;
    private connectedGremlins: Array<GremlinPlayer>;
    private gremlinWorld: GremlinWorld;

    constructor(port: number) {
        this.port = process.env.PORT || port; 
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.server = new http.Server(expressApp);
        this.io = new socketIO.Server(this.server);

        this.connectedGremlins = new Array();

        this.gremlinWorld = new GremlinWorld();
    }

    public start() {
        this.server.listen(this.port);
        console.log(`server listening on port ${this.port}`);

        
        this.io.on('connection', (socket: socketIO.Socket) => {
            console.log(`client connection: ${socket.id}`);
            
            socket.on('gcNewUser', (name: string) => {
                this.connectedGremlins.push(new GremlinPlayer(name, socket.id));
                console.log(`a gremlin has joined with the name ${name}.`);
                console.log(`network size: ${this.connectedGremlins.length}`);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });

            socket.on('disconnect', () => {
                const fallenGremlin: GremlinPlayer = this.getGremlinFromID(socket.id)!;
                console.log(`${fallenGremlin.getUsername()} disconnected.`);
                this.connectedGremlins.splice(this.getIndexFromGremlin(fallenGremlin), 1);
                console.log(`network size: ${this.connectedGremlins.length}`);
            });
        });
    }

    private getIndexFromGremlin(gremlin: GremlinPlayer): number {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlin.getGremlinID()) {
                return i;
            }
        }

        return NaN;
    }

    private getGremlinFromIndex(index: number): GremlinPlayer | void {
        for(let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == this.connectedGremlins[index].getGremlinID()) {
                return this.connectedGremlins[i];
            }
        }
    }
    
    private getGremlinFromID(gremlinID: string): GremlinPlayer | void {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlinID) {
                return this.connectedGremlins[i];
            }
        }
    }

}

new GremlinServer(29070).start();