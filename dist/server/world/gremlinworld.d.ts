import Gremlin from "../player/gremlin.js";
import GremlinPackage from "./gremlinpackage.js";
export default class GremlinWorld {
    private dt;
    private timeOfLastUpdate;
    private gameGremlins;
    constructor();
    addGremlin(id: string, name: string): void;
    removeGremlin(gremlin: Gremlin): void;
    removeGremlinFromID(id: string): void;
    createGremlinWorldPackage(): GremlinPackage;
}
