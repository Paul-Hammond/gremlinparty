//@ts-ignore
import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

export default class GremlinClient {
    private socket: io;
    private gremlinID: string;
    private gremlinUserName: string;

    constructor() {
        console.log('henlo this is the client speaking');
        this.socket = io();
        this.gremlinID = 'not-assigned';
        this.gremlinUserName = 'none';
    }

    public start() {
        this.socket.on('connect', () => {
            this.gremlinID = this.socket.id;
            this.shoutID();
            
            this.gsWelcome();

            this.socket.on('gsWorldUpdatePackage', (worldPackage: string) => {
                console.log(`world update package: ${worldPackage}`);
            });
            
        });

    }

    public receiveIDFromUser(name: string ) {
        this.gremlinUserName = name;

        console.log(`${this.gremlinID} sending name ${this.gremlinUserName} to server`);
        //(3/10/22) tell GremlinServer what your username is and wait for a gsWelcome event
        this.socket.emit('gcNewUser', this.gremlinUserName);
    }

    private gsWelcome() {
        this.socket.on('gsWelcome', (n: number) => {
            console.log(`server emitted gsWelcome with ${n} connected users`);
        });
    }

    private shoutID() {
        console.log(`shouting shoutING ${this.gremlinID}`);
    }
}