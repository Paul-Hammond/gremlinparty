import Gremlin from "../player/gremlin.js";
export default class GremlinPackage {
    private connectedGremlins;
    constructor();
    addGremlin(gremlin: Gremlin): void;
    removeGremlin(gremlin: Gremlin): void;
}
