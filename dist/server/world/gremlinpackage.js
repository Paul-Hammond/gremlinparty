import { getIndexFromGremlin } from "../player/gremlin.js";
export default class GremlinPackage {
    constructor() {
        this.packageCount = 0;
        this.connectedGremlins = new Array();
        this.packageCount++;
    }
    addGremlin(gremlin) {
        this.connectedGremlins.push(gremlin);
    }
    removeGremlin(gremlin) {
        const i = getIndexFromGremlin(gremlin, this.connectedGremlins);
        if (i) {
            this.connectedGremlins.splice(i, 1);
        }
    }
}
