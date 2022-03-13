import gcGremlin from '../player/gcgremlin.js';

export default class gcGremlinPackage {
    readonly gcConnectedGremlins: Array<gcGremlin>;
    
    constructor(fellowGremlins: Array<gcGremlin>) {
        this.gcConnectedGremlins = fellowGremlins;
    }

}