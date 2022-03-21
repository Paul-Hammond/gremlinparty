//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import gcGremlin from '../player/gcgremlin.js';
import GremlinCanvas from './gremlincanvas.js';
import Vec2 from '../math/gcVec2.js';
import gcCommand from '../player/commands/gccommand.js';
import gcBasicAttackCommand from '../player/commands/gcbasicattack.js';
export default class GremlinClient {
    constructor() {
        this.freg = false;
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
        this.selfStartingPos = new Vec2(0, 0);
        this.timeOfLastMouseEmit = 0;
    }
    start() {
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
        document.onmousedown = this.handleMouseDown.bind(this);
    }
    receiveIDFromUser(name, freg) {
        this.gremlinUserName = name;
        this.isPlaying = true;
        this.freg = freg;
        this.gCanvas.initCanvas();
        console.log(`${this.gremlinID} sending name ${this.gremlinUserName} to server`);
        //(3/10/22) tell GremlinServer what your username is and wait for a gsWelcome event
        this.socket.emit('gcNewUser', this.gremlinUserName);
        this.loop();
    }
    //socket callbacks
    gsWelcome() {
        this.socket.on('gsWelcome', (startingPos) => {
            console.log(`server emitted gsWelcome with ${startingPos.x}, ${startingPos.y} starting pos`);
            this.selfStartingPos.x = startingPos.x;
            this.selfStartingPos.y = startingPos.y;
        });
    }
    gsFallenGremlin() {
        this.socket.on('gsFallenGremlin', (id) => {
            const gremlin = this.fellowGremlins.get(id);
            if (gremlin) {
                this.fellowGremlins.delete(id);
            }
        });
    }
    gsGremlinPackage() {
        this.socket.on('gsGremlinPackage', (serverPackage) => {
            if (this.isPlaying) {
                for (let i = 0; i < serverPackage[0].connectedGremlins.length; i++) {
                    //(3/17/22) currentGremlin is a blob of data with all of the attributes of a Gremlin (server, not gc)
                    const currentGremlin = serverPackage[0].connectedGremlins[i];
                    // Paul - (03.16.22)
                    // catch player gremlin from being added yet
                    if (currentGremlin.gremlinID == this.gremlinID) {
                        if (currentGremlin.freg) {
                        }
                        this.selfGremlin = currentGremlin;
                    }
                    else {
                        const existingGremlin = this.fellowGremlins.get(currentGremlin.gremlinID);
                        if (existingGremlin) {
                            //(3/17/22) existing gremlin is found and not the player 
                            existingGremlin.targetPos = currentGremlin.pos;
                            existingGremlin.updateAimingPos(currentGremlin.aimingPosLatest);
                        }
                        else {
                            this.fellowGremlins.set(currentGremlin.gremlinID, new gcGremlin(currentGremlin.gremlinID, currentGremlin.name, currentGremlin.pos, currentGremlin.freg));
                        }
                    }
                }
                //(3/17/22) player loading, probably want this in its own function eventually
                const existingGremlin = this.fellowGremlins.get(this.gremlinID);
                if (existingGremlin) {
                    existingGremlin.targetPos = this.selfGremlin.pos;
                    this.fellowGremlins.set(this.gremlinID, existingGremlin);
                    this.selfGremlin = existingGremlin;
                }
                else {
                    //(3/17/22) this runs when the player gremlin is first initialized
                    const newGremlin = new gcGremlin(this.gremlinID, this.gremlinUserName, this.selfStartingPos, this.freg);
                    this.fellowGremlins.set(this.gremlinID, newGremlin);
                    this.selfGremlin = newGremlin;
                }
                //(3/13/22) logging once every 100 update packages sounds reasonable, don't want to flood the console
                if (serverPackage[1] % 100 == 0) {
                    console.log(`GremlinPackage count: ${serverPackage[1]}`);
                }
            }
        });
    }
    //end of socket callbacks
    loop() {
        if (this.isPlaying) {
            this.dt = performance.now() - this.timeOfLastUpdate;
            this.timeOfLastUpdate = performance.now();
            this.update(this.dt);
            this.render();
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    handleKeyDown(kEvt) {
        if (this.isPlaying) {
            switch (kEvt.code) {
                case 'KeyW':
                    const startMoveUpCommand = new gcCommand(this.socket.id, 'gcStartMoveUpCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveUpCommand);
                    break;
                case 'KeyA':
                    const startMoveLeftCommand = new gcCommand(this.socket.id, 'gcStartMoveLeftCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveLeftCommand);
                    break;
                case 'KeyS':
                    const startMoveDownCommand = new gcCommand(this.socket.id, 'gcStartMoveDownCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveDownCommand);
                    break;
                case 'KeyD':
                    const startMoveRightCommand = new gcCommand(this.socket.id, 'gcStartMoveRightCommand');
                    this.socket.emit('gcStateChangeCommand', startMoveRightCommand);
                    break;
            }
        }
    }
    handleKeyUp(kEvt) {
        if (this.isPlaying) {
            switch (kEvt.code) {
                case 'KeyW':
                    const stopMoveUpCommand = new gcCommand(this.socket.id, 'gcStopMoveUpCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveUpCommand);
                    break;
                case 'KeyA':
                    const stopMoveLeftCommand = new gcCommand(this.socket.id, 'gcStopMoveLeftCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveLeftCommand);
                    break;
                case 'KeyS':
                    const stopMoveDownCommand = new gcCommand(this.socket.id, 'gcStopMoveDownCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveDownCommand);
                    break;
                case 'KeyD':
                    const stopMoveRightCommand = new gcCommand(this.socket.id, 'gcStopMoveRightCommand');
                    this.socket.emit('gcStateChangeCommand', stopMoveRightCommand);
                    break;
            }
        }
    }
    handleMouseMove(mEvt) {
        if (this.isPlaying) {
            this.mousePos.x = mEvt.clientX - this.gCanvas.getBoundingBox().x;
            this.mousePos.y = mEvt.clientY - this.gCanvas.getBoundingBox().y;
            if (this.selfGremlin) {
                this.selfGremlin.updateAimingPos(this.mousePos);
            }
        }
    }
    handleMouseDown(mEvt) {
        if (this.isPlaying) {
            switch (mEvt.button) {
                //(3/20/22) left click
                case 0:
                    mEvt.preventDefault();
                    const basicAttackCommand = new gcBasicAttackCommand(this.socket.id, 'gcBasicAttackCommand', this.mousePos);
                    this.socket.emit('gcBasicAttackCommand', basicAttackCommand);
                    break;
            }
        }
    }
    update(dt) {
        if (performance.now() - this.timeOfLastMouseEmit > 50) {
            //(3/17/22) right here is where a gcCommand WOULD go, but the mouseUpdate is so trivial (it's just a Vec2)
            //that it's not worth creating a whole new class derived from gcCommand for it
            this.socket.emit('gcMouseUpdateCommand', this.mousePos);
            this.timeOfLastMouseEmit = performance.now();
        }
        // Paul - (03.15.22)
        // cast to array from the map - this probably isn't necessary 
        this.gCanvas.syncPlayers(Array.from(this.fellowGremlins.values()));
        this.gCanvas.update(dt);
    }
    render() {
        if (this.selfGremlin && this.selfStartingPos.x != 0 && this.selfStartingPos.y != 0) {
            this.gCanvas.render(this.selfGremlin);
        }
    }
}
