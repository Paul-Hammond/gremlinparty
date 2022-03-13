import Gremlin from '../player/gremlin.js';

export default class GremlinPackage {
    private connectedGremlins: Array<Gremlin>;

    constructor() {
        this.connectedGremlins = new Array();
    }

    public populateGremlins(gArray: Array<Gremlin>) {
        this.connectedGremlins = gArray;
    }
}