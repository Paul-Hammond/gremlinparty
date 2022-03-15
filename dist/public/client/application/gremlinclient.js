//@ts-ignore
import { io } from 'https://cdn.socket.io/4.3.0/socket.io.esm.min.js';
import gcGremlin from '../player/gcgremlin.js';
import GremlinCanvas from './gremlincanvas.js';
import gcCommand from '../player/commands/gcCommand.js';
export default class GremlinClient {
    constructor() {
        this.hasEmittedThisFrame = false;
        console.log('henlo this is the client speaking');
        this.isPlaying = false;
        this.socket = io();
        this.gremlinID = 'not-assigned';
        this.gremlinUserName = 'none';
        this.fellowGremlins = new Array();
        this.gCanvas = new GremlinCanvas();
        this.dt = 0;
        this.timeOfLastUpdate = 0;
    }
    start() {
        this.socket.on('connect', () => {
            this.gremlinID = this.socket.id;
            this.shoutID();
            //(3/12/22) socket callbacks
            //each function corresponds to its own socket.io message 
            this.gsWelcome();
            this.gsGremlinPackage();
        });
        document.onkeyup = this.handleKeyUp.bind(this);
        document.onkeydown = this.handleKeyDown.bind(this);
        //document.onmousemove = this
    }
    receiveIDFromUser(name) {
        this.gremlinUserName = name;
        this.isPlaying = true;
        this.gCanvas.initCanvas();
        console.log(`${this.gremlinID} sending name ${this.gremlinUserName} to server`);
        //(3/10/22) tell GremlinServer what your username is and wait for a gsWelcome event
        this.socket.emit('gcNewUser', this.gremlinUserName);
        this.loop();
    }
    //callbacks
    gsWelcome() {
        this.socket.on('gsWelcome', (n) => {
            console.log(`server emitted gsWelcome with ${n} connected users`);
        });
    }
    gsGremlinPackage() {
        this.socket.on('gsGremlinPackage', (serverPackage) => {
            if (this.isPlaying) {
                //(3/13/22) reset the fellowGremlins array and repopulate it from the GremlinPackage
                this.fellowGremlins.length = 0;
                for (let i = 0; i < serverPackage[0].connectedGremlins.length; i++) {
                    const currentGremlin = serverPackage[0].connectedGremlins[i];
                    this.fellowGremlins.push(new gcGremlin(currentGremlin.gremlinID, currentGremlin.name, currentGremlin.pos));
                }
                //(3/13/22) logging once every 25 update packages sounds reasonable, don't want to flood the console
                if (serverPackage[1] % 25 == 0) {
                    console.log(`GremlinPackage count: ${serverPackage[1]}`);
                }
            }
        });
    }
    //end of callbacks
    shoutID() {
        console.log(`shouting shoutING ${this.gremlinID}`);
    }
    loop() {
        if (this.isPlaying) {
            this.dt = performance.now() - this.timeOfLastUpdate;
            this.timeOfLastUpdate = performance.now();
            this.hasEmittedThisFrame = false;
            this.update(this.dt);
            this.render();
            // const cmd = this.handleInput();
            // if (cmd) {
            //     this.socket.emit('gcCommand', cmd);
            // }
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
    update(dt) {
        this.gCanvas.syncPlayers(this.fellowGremlins);
        this.gCanvas.update(dt);
    }
    render() {
        this.gCanvas.render();
    }
}
