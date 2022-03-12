import Gremlin from "../player/gremlin.js";
import  { getIndexFromGremlin } from "../player/gremlin.js";

export default class GremlinPackage {
    private connectedGremlins: Array<Gremlin>;

    constructor() {
        this.connectedGremlins = new Array();
    }

    addGremlin(gremlin: Gremlin): void {
        this.connectedGremlins.push(gremlin);
    }

    removeGremlin(gremlin: Gremlin): void {
        const i: number | void = getIndexFromGremlin(gremlin, this.connectedGremlins);
        if (i) {
            this.connectedGremlins.splice(i, 1);
        }
    }
}