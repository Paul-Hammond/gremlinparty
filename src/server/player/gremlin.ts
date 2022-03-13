import Vec2 from '../math/vec2';

export default class Gremlin {
    readonly gremlinID: string;
    private name: string = 'UnnamedGremlin';
    public pos: Vec2;
    
    //(3/13/22) server specific, every gremlin on the client (gcGremlin) is assumed to be playing
    public isPlaying = false;

    constructor(id: string, startingPos: Vec2) {
        this.gremlinID = id;
        this.pos = startingPos;
    }

    public startPlaying(name: string): void {
        this.name = name;
        this.isPlaying = true;
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