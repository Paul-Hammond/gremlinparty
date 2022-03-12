import { getIndexFromGremlin } from "../player/gremlin.js";
export default class GremlinPackage {
    constructor() {
        this.connectedGremlins = new Array();
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
