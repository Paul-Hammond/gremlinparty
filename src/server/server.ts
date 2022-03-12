import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

import * as socketIO from 'socket.io';

//(3/12/22) a ConnectedClient is a thin tuple, it has a username and a gremlinID, that's it
import ConnectedClient from './player/connectedclient.js';

//(3/12/22) does most of the heavy lifting for the game
import GremlinWorld from './world/gremlinworld.js';

//(3/12/22) Gremlin class and helper functions
import Gremlin from './player/gremlin.js';
import { getGremlinFromID, getGremlinFromIndex, getIndexFromGremlin } from './player/gremlin.js';



const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);

class GremlinServer {
    private server: http.Server;
    private port: string | number;
    private io: socketIO.Server;
    private connectedGremlins: Array<ConnectedClient>;
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
                this.connectedGremlins.push(new ConnectedClient(socket.id, name));
                console.log(`+++ ${this.connectedGremlins.length} network size. ${name} joined the gremlin party.`);
                this.gremlinWorld.addGremlin(socket.id, name);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });

            socket.on('disconnect', () => {
                const fallenGremlinCC: ConnectedClient | void = this.getGremlinFromID(socket.id);

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
                //(3/12/22) create what boils down to a world update tick
                const currentPackage = this.gremlinWorld.createGremlinWorldPackage();

                //(3/12/22) this console.log isn't needed, but is nice to have the server periodically report
                //how many GremlinPackages it has sent
                if (currentPackage[1] % 100 == 0) {
                    console.log(`GremlinPackage count: ${currentPackage[1]}, current network size: ${this.connectedGremlins.length}`);
                }
                this.io.emit('gsGremlinPackage', currentPackage);
            }
        }, 200);

    }

    private getIndexFromGremlin(gremlin: ConnectedClient): number {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlin.getGremlinID()) {
                return i;
            }
        }

        return NaN;
    }

    private getGremlinFromIndex(index: number): ConnectedClient | void {
        for(let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == this.connectedGremlins[index].getGremlinID()) {
                return this.connectedGremlins[i];
            }
        }
    }
    
    private getGremlinFromID(gremlinID: string): ConnectedClient | void {
        for (let i = 0; i < this.connectedGremlins.length; i++) {
            if (this.connectedGremlins[i].getGremlinID() == gremlinID) {
                return this.connectedGremlins[i];
            }
        }
    }

    private getUsernamefromGremlinID(gremlinID: string): string {
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



