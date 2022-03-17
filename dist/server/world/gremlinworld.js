import { getGremlinFromID } from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';
export default class GremlinWorld {
    constructor() {
        console.log('calling gremlinWorld constructor');
        this.gameGremlins = new Array();
        this.packageCount = 0;
    }
    update(dt) {
        this.gameGremlins.forEach(gremlin => {
            gremlin.update(dt, this.gameGremlins);
        });
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
