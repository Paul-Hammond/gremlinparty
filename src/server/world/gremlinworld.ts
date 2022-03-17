import Gremlin, { getGremlinFromID } from '../player/gremlin.js';
import GremlinPackage from './gremlinpackage.js';

// Paul - (03.15.22) - was getting import errors from performance
import { performance } from 'perf_hooks';
import Vec2 from '../math/vec2.js';

export default class GremlinWorld {
    private gameGremlins: Array<Gremlin>;
    private packageCount: number;

    constructor() {
        console.log('calling gremlinWorld constructor');
        this.gameGremlins = new Array();
        this.packageCount = 0;
    }

    public update(dt: number): void {
        this.gameGremlins.forEach(gremlin => {
            gremlin.update(dt, this.gameGremlins);
        });
    }

    public dispatchCommandToID(id: string, gcCommand: any): void {
        const gremlin = getGremlinFromID(id, this.gameGremlins);
        if (gremlin) {
            gremlin.receivegcCommand(gcCommand);

        }
    }

    public dispatchMouseUpdateToID(id: string, mousePos: Vec2): void {
        const gremlin = getGremlinFromID(id, this.gameGremlins);
        if (gremlin) {
            gremlin.receiveAimingPos(mousePos);
        }
    }

    public syncGremlins(gremlinPlayers: Array<Gremlin>): void {
        this.gameGremlins = gremlinPlayers;
    }


    public createGremlinWorldPackage(): [GremlinPackage, number] {
        const currentGremlinPackage: GremlinPackage = new GremlinPackage();
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