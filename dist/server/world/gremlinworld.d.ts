import Gremlin from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';
export default class GremlinWorld {
    private dt;
    private timeOfLastUpdate;
    private gameGremlins;
    private packageCount;
    constructor();
    update(dt: number): void;
    syncGremlins(gremlinPlayers: Array<Gremlin>): void;
    createGremlinWorldPackage(): [GremlinPackage, number];
}
