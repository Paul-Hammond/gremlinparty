import gcGremlin from "../player/gcgremlin.js";
export default class gcGremlinPackage {
    private gcConnectedGremlins;
    constructor();
    setConnectedGremlins(gremlins: Array<gcGremlin>): void;
    getConnectedGremlins(): Array<gcGremlin>;
}
