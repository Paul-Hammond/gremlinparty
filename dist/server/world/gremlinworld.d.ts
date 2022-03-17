import Gremlin from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';
import Vec2 from '../math/vec2.js';
export default class GremlinWorld {
    private dt;
    private timeOfLastUpdate;
    private gameGremlins;
    private packageCount;
    constructor();
    update(dt: number): void;
    dispatchCommandToID(id: string, gcCommand: any): void;
    dispatchMouseUpdateToID(id: string, mousePos: Vec2): void;
    syncGremlins(gremlinPlayers: Array<Gremlin>): void;
    createGremlinWorldPackage(): [GremlinPackage, number];
}
