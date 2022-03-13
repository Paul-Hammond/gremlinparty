export default class Gremlin {
    constructor(id, startingPos) {
        this.isPlaying = false;
        this.name = 'UnnamedGremlin';
        this.gremlinID = id;
        this.pos = startingPos;
    }
    startPlaying(name) {
        this.name = name;
        this.isPlaying = true;
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
