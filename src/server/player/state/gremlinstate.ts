import Gremlin from '../gremlin.js';

 export default abstract class GremlinState {
    owner: string;
    constructor(owner: string) {
        this.owner = owner;
    }
    abstract update(dt: number, gremlins: Array<Gremlin>): void;
}