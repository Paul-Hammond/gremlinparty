import gcGremlin from "../player/gcgremlin.js";

export default class gcGremlinPackage {
    private gcConnectedGremlins: Array<gcGremlin>;

    constructor() {
        this.gcConnectedGremlins = new Array();
    }

    setConnectedGremlins(gremlins: Array<gcGremlin>): void {
        this.gcConnectedGremlins = gremlins;
    }

    getConnectedGremlins(): Array<gcGremlin> {
        return this.gcConnectedGremlins;
    }
}