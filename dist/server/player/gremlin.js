export default class Gremlin {
    constructor(id, name, startingPos) {
        this.gremlinID = name;
        this.username = name;
        this.pos = startingPos;
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
