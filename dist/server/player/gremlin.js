import Vec2 from '../math/vec2.js';
import MovementState, { Direction } from './state/movementstate.js';
export default class Gremlin {
    constructor(id, startingPos) {
        this.name = 'UnnamedGremlin';
        this.freg = false;
        //(3/13/22) server specific fields 
        //every gremlin on the client (gcGremlin) is assumed to be playing
        this.isPlaying = false;
        this.gremlinID = id;
        this.pos = startingPos;
        this.aimingPosLatest = new Vec2(50, 50);
        this.state = new MovementState(id);
    }
    startPlaying(name) {
        this.name = name;
        if (this.name == 'freg') {
            this.freg = true;
        }
        this.isPlaying = true;
    }
    receivegcCommand(gcCommand) {
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
    receiveAimingPos(pos) {
        this.aimingPosLatest = pos;
    }
    update(dt, gremlins) {
        this.state.update(dt, gremlins);
    }
    getName() {
        const name = this.name;
        return name;
    }
}
//(3/12/22) gremlin helper functions
export function getGremlinFromID(id, gremlinArray) {
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == id) {
            return gremlinArray[i];
        }
    }
}
export function getGremlinFromIndex(index, gremlinArray) {
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == gremlinArray[index].gremlinID) {
            return gremlinArray[i];
        }
    }
}
export function getIndexFromGremlin(g, gremlinArray) {
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].gremlinID == g.gremlinID) {
            return i;
        }
    }
}
export function getPlayingGremlins(gremlinArray) {
    const playingGremlins = new Array();
    for (let i = 0; i < gremlinArray.length; i++) {
        if (gremlinArray[i].isPlaying) {
            playingGremlins.push(gremlinArray[i]);
        }
    }
    return playingGremlins;
}
