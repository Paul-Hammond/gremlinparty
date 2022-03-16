import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

import * as socketIO from 'socket.io';

import NumberGenerator from './math/numbergenerator.js';
import Vec2 from './math/vec2.js';

//(3/12/22) does most of the heavy lifting for the game
import GremlinWorld from './world/gremlinworld.js';

//(3/12/22) Gremlin class and helper functions
import Gremlin, { getPlayingGremlins } from './player/gremlin.js';
import { getGremlinFromID,  getIndexFromGremlin } from './player/gremlin.js';




const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const distPath: string = path.dirname(__dirname);

class GremlinServer {
    private server: http.Server;
    private port: string | number;
    private io: socketIO.Server;
    private connectedGremlins: Array<Gremlin>;
    private gremlinWorld: GremlinWorld;
    private tickRateMs: number;
    

    constructor(port: number) {
        this.port = process.env.PORT || port; 
        const expressApp = express();
        expressApp.use(express.static(path.join(distPath, 'public')));

        this.server = new http.Server(expressApp);
        this.io = new socketIO.Server(this.server);

        this.connectedGremlins = new Array();

        this.gremlinWorld = new GremlinWorld();
        this.tickRateMs = 50;

    }

    public start() {
        this.server.listen(this.port);
        console.log(`server listening on port ${this.port}`);

        
        this.io.on('connection', (socket: socketIO.Socket) => {
            const randomVec: Vec2 = NumberGenerator.generateVec(new Vec2(100, 100), new Vec2(1266, 668));
            this.connectedGremlins.push(new Gremlin(socket.id, randomVec));
            console.log(`+++ connection: ${socket.id}. ${this.connectedGremlins.length} online and ${getPlayingGremlins(this.connectedGremlins).length} playing`);
            
            socket.on('gcNewUser', (name: string) => {
                const newGrem: Gremlin = getGremlinFromID(socket.id, this.connectedGremlins)!;
                newGrem.startPlaying(name);
                console.log(`${newGrem.getName()} started playing. ${this.connectedGremlins.length} online and ${getPlayingGremlins(this.connectedGremlins).length} playing`);
                this.io.to(socket.id).emit('gsWelcome', this.connectedGremlins.length);
            });


            socket.on('disconnect', () => {
                const fallenGremlin: Gremlin = getGremlinFromID(socket.id, this.connectedGremlins)!;

                if (fallenGremlin.getName() == 'UnnamedGremlin') {
                    this.connectedGremlins.splice(getIndexFromGremlin(fallenGremlin, this.connectedGremlins)!, 1);
                }
                else {
                    this.connectedGremlins.splice(getIndexFromGremlin(fallenGremlin, this.connectedGremlins)!, 1);
                    this.io.emit('gsFallenGremlin', socket.id);
                }

                const playerCount: number = getPlayingGremlins(this.connectedGremlins).length;
                console.log(`--- ${fallenGremlin.gremlinID} disconnected. ${this.connectedGremlins.length} online and ${playerCount} playing`);

            });

            //client commands

            socket.on('gcStateChangeCommand', (gcStateChangeCommand: any) => {
                this.gremlinWorld.dispatchCommandToID(socket.id, gcStateChangeCommand);
            });

        });

        //(3/12/22) effectively the GremlinServer update function. emits the gsGremlinPackage message
        //x times a second to all connected clients 
        setInterval(() => {
            if (this.connectedGremlins.length >= 1) {
                //(3/12/22) create what boils down to a world update tick

                const players: Array<Gremlin> = getPlayingGremlins(this.connectedGremlins);
                this.gremlinWorld.syncGremlins(players);
                this.gremlinWorld.update(this.tickRateMs);
                const currentPackage = this.gremlinWorld.createGremlinWorldPackage();

                //(3/12/22) this console.log isn't needed, but is nice to have the server periodically report
                //how many GremlinPackages it has sent
                if (currentPackage[1] % 200 == 0 && currentPackage[1] > 0) {
                    console.log(`GremlinPackage count: ${currentPackage[1]}, ${this.connectedGremlins.length} online and ${players.length} playing`);
                }
                this.io.emit('gsGremlinPackage', currentPackage);
            }
        }, this.tickRateMs);

    }


}

const gs = new GremlinServer(29070);
gs.start();



