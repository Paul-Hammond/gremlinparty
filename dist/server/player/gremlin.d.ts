export default class Gremlin {
    readonly gremlinID: string;
    readonly username: string;
    private pos;
    constructor(id: string, name: string, startingPos: number);
}
export declare function getGremlinFromID(id: string, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getGremlinFromIndex(index: number, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getIndexFromGremlin(g: Gremlin, gremlinArray: Array<Gremlin>): number | void;
