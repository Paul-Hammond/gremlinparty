export default class gcGremlinPackage {
    constructor() {
        this.gcConnectedGremlins = new Array();
    }
    setConnectedGremlins(gremlins) {
        this.gcConnectedGremlins = gremlins;
    }
    getConnectedGremlins() {
        return this.gcConnectedGremlins;
    }
}
