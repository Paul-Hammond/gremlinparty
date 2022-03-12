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
            
            //(3/12/22) socket callbacks
            //each function corresponds to its own socket.io message 
            this.gsWelcome();
            this.gsGremlinPackage();
            
        });

    }

    public receiveIDFromUser(name: string ) {
        this.gremlinUserName = name;

        console.log(`${this.gremlinID} sending name ${this.gremlinUserName} to server`);
        //(3/10/22) tell GremlinServer what your username is and wait for a gsWelcome event
        this.socket.emit('gcNewUser', this.gremlinUserName);
    }

    //callbacks

    private gsWelcome() {
        this.socket.on('gsWelcome', (n: number) => {
            console.log(`server emitted gsWelcome with ${n} connected users`);
        });
    }

    private gsGremlinPackage() {
        this.socket.on('gsGremlinPackage', (gremlinPackage: any) => {
            console.log(gremlinPackage);
        })
    }

    //end of callbacks

    private shoutID() {
        console.log(`shouting shoutING ${this.gremlinID}`);
    }
}