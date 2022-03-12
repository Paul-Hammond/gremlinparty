export default class Gremlin {
    readonly gremlinID: string;
    readonly username: string;
    private pos: number;

    constructor(id: string, name: string, startingPos: number) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
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