//@ts-ignore
import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

export default class GremlinClient {
    private socket: any;
    private gremlinID: string;

    constructor() {
        console.log('henlo this is the client speaking');
        this.socket = io();
        this.gremlinID = 'notagremlin';
    }

    public start() {
        this.socket.on('connect', () => {
            this.gremlinID = this.socket.id;
            this.shoutID();
        });

    }

    private shoutID() {
        console.log(`shouting shoutING ${this.gremlinID}`);
    }
}