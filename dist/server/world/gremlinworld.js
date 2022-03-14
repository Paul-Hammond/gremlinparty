import { getGremlinFromID } from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';
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
            if (gremlin.isMovingUp) {
                gremlin.pos.offsetY((.15 * dt) * -1);
            }
            if (gremlin.isMovingLeft) {
                gremlin.pos.offsetX((.15 * dt) * -1);
            }
            if (gremlin.isMovingRight) {
                gremlin.pos.offsetX(.15 * dt);
            }
            if (gremlin.isMovingDown) {
                gremlin.pos.offsetY(.15 * dt);
            }
        });
    }
    changeGremlinState(id, gcStateChangeCommand) {
        const gremlin = getGremlinFromID(id, this.gameGremlins);
        if (gremlin) {
            switch (gcStateChangeCommand.commandTitle) {
                case 'gcStartMoveUpCommand':
                    gremlin.isMovingDown = false;
                    gremlin.isMovingUp = true;
                    break;
                case 'gcStopMoveUpCommand':
                    gremlin.isMovingUp = false;
                    break;
                case 'gcStartMoveLeftCommand':
                    gremlin.isMovingRight = false;
                    gremlin.isMovingLeft = true;
                    break;
                case 'gcStopMoveLeftCommand':
                    gremlin.isMovingLeft = false;
                    break;
                case 'gcStartMoveDownCommand':
                    gremlin.isMovingUp = false;
                    gremlin.isMovingDown = true;
                    break;
                case 'gcStopMoveDownCommand':
                    gremlin.isMovingDown = false;
                    break;
                case 'gcStartMoveRightCommand':
                    gremlin.isMovingLeft = false;
                    gremlin.isMovingRight = true;
                    break;
                case 'gcStopMoveRightCommand':
                    gremlin.isMovingRight = false;
                    break;
            }
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
