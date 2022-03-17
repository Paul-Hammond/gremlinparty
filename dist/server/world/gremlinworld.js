import { getGremlinFromID } from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';
// Paul - (03.15.22) - was getting import errors from performance
import { performance } from 'perf_hooks';
export default class GremlinWorld {
    constructor() {
        console.log('calling gremlinWorld constructor');
        this.gameGremlins = new Array();
        this.packageCount = 0;
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
    }
    update(dt) {
        this.gameGremlins.forEach(gremlin => {
            gremlin.update(dt, this.gameGremlins);
        });
        // this.gameGremlins.forEach(gremlin => {
        //     this.gameGremlins.forEach(g => {
        //         if (g.gremlinID != gremlin.gremlinID && CollisionDetector.axisAlignedBoundBox(g.pos, new Vec2(72, 72), gremlin.pos, new Vec2(72, 72))) {
        //         } else {
        //         }
        //     });
        // });
    }
    dispatchCommandToID(id, gcCommand) {
        const gremlin = getGremlinFromID(id, this.gameGremlins);
        if (gremlin) {
            gremlin.receivegcCommand(gcCommand);
        }
    }
    dispatchMouseUpdateToID(id, mousePos) {
        const gremlin = getGremlinFromID(id, this.gameGremlins);
        if (gremlin) {
            gremlin.receiveAimingPos(mousePos);
        }
    }
    syncGremlins(gremlinPlayers) {
        this.gameGremlins = gremlinPlayers;
    }
    createGremlinWorldPackage() {
        const currentGremlinPackage = new GremlinPackage();
        if (this.gameGremlins.length >= 1) {
            this.packageCount++;
            currentGremlinPackage.populateGremlins(this.gameGremlins);
        }
        else {
            this.packageCount = 0;
        }
        return [currentGremlinPackage, this.packageCount];
    }
}
