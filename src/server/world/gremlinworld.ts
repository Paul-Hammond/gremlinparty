import Gremlin from "../player/gremlin.js";
import GremlinPackage from "./gremlinpackage.js";
import { getGremlinFromID, getGremlinFromIndex, getIndexFromGremlin } from '../player/gremlin.js';

export default class GremlinWorld {
    private dt: number;
    private timeOfLastUpdate: number;
    private gameGremlins: Array<Gremlin>;
    
    constructor() {
        console.log('calling gremlinWorld constructor');
        this.gameGremlins = new Array();
    

        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
    }

    public addGremlin(id: string, name: string): void {
        const newPartyGremlin: Gremlin = new Gremlin(id, name, 16);
        this.gameGremlins.push(newPartyGremlin);
    }

    public removeGremlin(gremlin: Gremlin): void {
        const i: number | void = getIndexFromGremlin(gremlin, this.gameGremlins);
        if (i) {
            this.gameGremlins.splice(i, 1);
        }

    }

    public removeGremlinFromID(id: string): void {
        const g: Gremlin = getGremlinFromID(id, this.gameGremlins)!;
        if (g) {
            const i = getIndexFromGremlin(g, this.gameGremlins)!;
            this.gameGremlins.splice(i, 1);
        }
    }

    public createGremlinWorldPackage(): GremlinPackage {
        const currentGremlinPackage: GremlinPackage = new GremlinPackage();
        
        if (this.gameGremlins.length >= 1) {
            for (let i = 0; i < this.gameGremlins.length; i++) {
                currentGremlinPackage.addGremlin(this.gameGremlins[i]);
            }
        }

        return currentGremlinPackage;
    }

    //(3/11/22) create a heartbeat function that emits a GremlinWorldPackage every 1/3rd second
    //heartbeat function will act as update. first step is to read the queue of GremlinMessages
    //and change state according to those. Then, let everything else act according to its own state
    //with the passage of time
}