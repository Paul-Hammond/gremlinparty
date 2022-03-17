import Vec2 from '../math/vec2.js';

import GremlinState from './state/gremlinstate.js';
import MovementState, { Direction } from './state/movementstate.js';

export default class Gremlin {
    readonly gremlinID: string;
    private name: string = 'UnnamedGremlin';
    public pos: Vec2;

    //(3/17/22) this Vec2 is a good estimate of what the gremlin user is pointing at, but is up to four
    //server ticks (200ms) out of date (this frequency of updating is determined in GremlinClient)
    public aimingPosLatest: Vec2;

    private state: MovementState;

    
    //(3/13/22) server specific fields 

    //every gremlin on the client (gcGremlin) is assumed to be playing
    public isPlaying = false;


    constructor(id: string, startingPos: Vec2) {
        this.gremlinID = id;
        this.pos = startingPos;
        this.aimingPosLatest = new Vec2(50, 50);
        this.state = new MovementState(id);
    }

    public startPlaying(name: string): void {
        this.name = name;
        this.isPlaying = true;
    }

    public receivegcCommand(gcCommand: any): void {
        switch (gcCommand.commandTitle) {
            case 'gcStartMoveUpCommand':
                this.state.addDirection(Direction.Up);
                break;
            case 'gcStopMoveUpCommand':
                this.state.removeDirection(Direction.Up);
                break;
            case 'gcStartMoveDownCommand':
                this.state.addDirection(Direction.Down);
                break;
            case 'gcStopMoveDownCommand':
                this.state.removeDirection(Direction.Down);
                break;
            case 'gcStartMoveLeftCommand':
                this.state.addDirection(Direction.Left);
                break;
            case 'gcStopMoveLeftCommand':
                this.state.removeDirection(Direction.Left);
                break;
            case 'gcStartMoveRightCommand':
                this.state.addDirection(Direction.Right);
                break;
            case 'gcStopMoveRightCommand':
                this.state.removeDirection(Direction.Right);
                break;
        }
    }

    public receiveAimingPos(pos: Vec2): void {
        this.aimingPosLatest = pos;
    }

    public update(dt: number, gremlins: Array<Gremlin>): void {
        this.state.update(dt, gremlins);
    }

    public getName(): string {
        const name = this.name;
        return name;
    }
}

//(3/12/22) gremlin helper functions

export function getGremlinFromID(id: string, gremlinArray: Array<Gremlin>): Gremlin | void {
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == id) {
            return gremlinArray[i];
        }
    }

}

export function getGremlinFromIndex(index: number, gremlinArray: Array<Gremlin>): Gremlin | void {
    for(let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == gremlinArray[index].gremlinID) {
            return gremlinArray[i];
        }
    }
}

export function getIndexFromGremlin(g: Gremlin, gremlinArray: Array<Gremlin>): number | void {
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == g.gremlinID) {
            return i;
        }
    }
}

export function getPlayingGremlins(gremlinArray: Array<Gremlin>): Array<Gremlin> {
    const playingGremlins: Array<Gremlin> = new Array();
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].isPlaying) {
            playingGremlins.push(gremlinArray[i]);
        }
    }
    return playingGremlins;
}