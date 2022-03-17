//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';

import gcGremlin from '../player/gcgremlin.js';
import GremlinCanvas from './gremlincanvas.js';

import gcCommand from '../player/commands/gcCommand.js';
import Vec2 from '../math/gcVec2.js';

export default class GremlinClient {
    private socket: io;
    private gremlinID: string;
    private gremlinUserName: string;
    private selfGremlin!: gcGremlin;
    private fellowGremlins: Map<string, gcGremlin>;
    private isPlaying: boolean;

    private dt: number;
    private timeOfLastUpdate: number;
    private gCanvas: GremlinCanvas;

    private mousePos: Vec2;

    constructor() {
        console.log('henlo this is the client speaking');
        this.isPlaying = false;
        this.socket = io();
        this.gremlinID = 'not-assigned';
        this.gremlinUserName = 'none';
        this.fellowGremlins = new Map();

        this.gCanvas = new GremlinCanvas();

        this.dt = 0;
        this.timeOfLastUpdate = 0;
        this.mousePos = new Vec2(0, 0);
    }

    public start() {
        this.socket.on('connect', () => {
            this.gremlinID = this.socket.id;

            //(3/12/22) socket callbacks
            //each function corresponds to its own socket.io message 
            this.gsWelcome();
            this.gsFallenGremlin();
            this.gsGremlinPackage();

        });

        //(3/16/22) input callbacks
        document.onkeyup = this.handleKeyUp.bind(this);
        document.onkeydown = this.handleKeyDown.bind(this);
        document.onmousemove = this.handleMouseMove.bind(this);
    }


    public receiveIDFromUser(name: string) {
        this.gremlinUserName = name;
        this.isPlaying = true;
        this.gCanvas.initCanvas();

        console.log(`${this.gremlinID} sending name ${this.gremlinUserName} to server`);
        //(3/10/22) tell GremlinServer what your username is and wait for a gsWelcome event
        this.socket.emit('gcNewUser', this.gremlinUserName);

        this.loop();
    }

    //socket callbacks

    private gsWelcome() {
        this.socket.on('gsWelcome', (n: number) => {
            console.log(`server emitted gsWelcome with ${n} connected users`);
        });
    }

    private gsFallenGremlin() {
        this.socket.on('gsFallenGremlin', (id: string) => {
            const gremlin = this.fellowGremlins.get(id);
            if (gremlin) {
                this.fellowGremlins.delete(id);
            }
        });
    }

    private gsGremlinPackage() {

        this.socket.on('gsGremlinPackage', (serverPackage: any) => {
            if (this.isPlaying) {
                for (let i = 0; i < serverPackage[0].connectedGremlins.length; i++) {
                    const currentGremlin = serverPackage[0].connectedGremlins[i];
                    // Paul - (03.16.22)
                    // catch player gremlin from being added yet
                    if (currentGremlin.gremlinID == this.gremlinID) {
                        this.selfGremlin = currentGremlin;
                    }
                    // Paul - (03.15.22)
                    // reassign existing gremlins and add new gremlins to map
                    else {
                        const existingGremlin = this.fellowGremlins.get(currentGremlin.gremlinID);
                        if (existingGremlin) {
                            existingGremlin.targetPos = currentGremlin.pos;
                        }
                        else {
                            this.fellowGremlins.set(currentGremlin.gremlinID, new gcGremlin(currentGremlin.gremlinID, currentGremlin.name, currentGremlin.pos));
                        }
                    }
                }


                const existingGremlin = this.fellowGremlins.get(this.selfGremlin.gremlinID);
                if (existingGremlin) {
                    this.fellowGremlins.delete(this.selfGremlin.gremlinID);
                    const newGremlin = new gcGremlin(this.selfGremlin.gremlinID, this.selfGremlin.name, existingGremlin.pos);
                    if (newGremlin) {
                        newGremlin.targetPos = this.selfGremlin.pos;
                        newGremlin.updateAimingPos(existingGremlin.aimingPos);
                        this.fellowGremlins.set(this.selfGremlin.gremlinID, newGremlin);
                        this.selfGremlin = newGremlin;
                    }


                }
                else {
                    const newGremlin = new gcGremlin(this.selfGremlin.gremlinID, this.selfGremlin.name, this.selfGremlin.pos);
                    this.fellowGremlins.set(this.selfGremlin.gremlinID, newGremlin);
                    this.selfGremlin = newGremlin;
                }

                //(3/13/22) logging once every 50 update packages sounds reasonable, don't want to flood the console
                if (serverPackage[1] % 50 == 0) {
                    console.log(`GremlinPackage count: ${serverPackage[1]}`);
                }
            }
        });
    }

    //end of socket callbacks

    private loop(): void {
        if (this.isPlaying) {
            this.dt = performance.now() - this.timeOfLastUpdate;
            this.timeOfLastUpdate = performance.now();


            this.update(this.dt);
            this.render();

            requestAnimationFrame(this.loop.bind(this));
        }
    }

    private handleKeyDown(kEvt: KeyboardEvent): void {
        if (this.isPlaying) {
            switch (kEvt.code) {
                case 'KeyW':
                    const startMoveUpCommand: gcCommand = new gcCommand(this.socket.id, 'gcStartMoveUpCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveUpCommand);
                    break;
                case 'KeyA':
                    const startMoveLeftCommand: gcCommand = new gcCommand(this.socket.id, 'gcStartMoveLeftCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveLeftCommand);
                    break;
                case 'KeyS':
                    const startMoveDownCommand: gcCommand = new gcCommand(this.socket.id, 'gcStartMoveDownCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveDownCommand);
                    break;
                case 'KeyD':
                    const startMoveRightCommand: gcCommand = new gcCommand(this.socket.id, 'gcStartMoveRightCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveRightCommand);
                    break;
            }
        }

    }

    private handleKeyUp(kEvt: KeyboardEvent): void {
        if (this.isPlaying) {
            switch (kEvt.code) {
                case 'KeyW':
                    const stopMoveUpCommand: gcCommand = new gcCommand(this.socket.id, 'gcStopMoveUpCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveUpCommand);
                    break;
                case 'KeyA':
                    const stopMoveLeftCommand: gcCommand = new gcCommand(this.socket.id, 'gcStopMoveLeftCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveLeftCommand);
                    break;
                case 'KeyS':
                    const stopMoveDownCommand: gcCommand = new gcCommand(this.socket.id, 'gcStopMoveDownCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveDownCommand);
                    break;
                case 'KeyD':
                    const stopMoveRightCommand: gcCommand = new gcCommand(this.socket.id, 'gcStopMoveRightCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveRightCommand);
                    break;
            }
        }
    }

    private handleMouseMove(mEvt: MouseEvent): void {
        if (this.isPlaying) {
            this.mousePos.x = mEvt.clientX - this.gCanvas.getBoundingBox().x
            this.mousePos.y = mEvt.clientY - this.gCanvas.getBoundingBox().y;

            this.selfGremlin.updateAimingPos(this.mousePos);
        }
    }

    private update(dt: number): void {
        // Paul - (03.15.22)
        // cast to array from the map - this probably isn't necessary 
        this.gCanvas.syncPlayers(Array.from(this.fellowGremlins.values()));
        this.gCanvas.update(dt);

    }

    private render(): void {
        this.gCanvas.render();
    }
}