export default class Gremlin {
    isPlaying: boolean;
    readonly gremlinID: string;
    private name;
    pos: number;
    constructor(id: string, startingPos: number);
    startPlaying(name: string): void;
    getName(): string;
}
export declare function getGremlinFromID(id: string, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getGremlinFromIndex(index: number, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getIndexFromGremlin(g: Gremlin, gremlinArray: Array<Gremlin>): number | void;
export declare function getPlayingGremlins(gremlinArray: Array<Gremlin>): Array<Gremlin>;
