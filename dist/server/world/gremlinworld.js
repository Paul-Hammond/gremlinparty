import Gremlin from "../player/gremlin.js";
import GremlinPackage from "./gremlinpackage.js";
import { getGremlinFromID, getIndexFromGremlin } from '../player/gremlin.js';
export default class GremlinWorld {
    constructor() {
        console.log('calling gremlinWorld constructor');
        this.gameGremlins = new Array();
        this.packageCount = 0;
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
    }
    addGremlin(id, name) {
        const newPartyGremlin = new Gremlin(id, name, 16);
        this.gameGremlins.push(newPartyGremlin);
    }
    removeGremlin(gremlin) {
        const i = getIndexFromGremlin(gremlin, this.gameGremlins);
        if (i) {
            this.gameGremlins.splice(i, 1);
        }
    }
    removeGremlinFromID(id) {
        const g = getGremlinFromID(id, this.gameGremlins);
        if (g) {
            const i = getIndexFromGremlin(g, this.gameGremlins);
            this.gameGremlins.splice(i, 1);
        }
    }
    createGremlinWorldPackage() {
        const currentGremlinPackage = new GremlinPackage();
        if (this.gameGremlins.length >= 1) {
            this.packageCount++;
            for (let i = 0; i < this.gameGremlins.length; i++) {
                currentGremlinPackage.addGremlin(this.gameGremlins[i]);
            }
        }
        return [currentGremlinPackage, this.packageCount];
    }
}
