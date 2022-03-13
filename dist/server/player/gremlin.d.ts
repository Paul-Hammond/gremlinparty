import Vec2 from '../math/vec2';
export default class Gremlin {
    readonly gremlinID: string;
    private name;
    pos: Vec2;
    isPlaying: boolean;
    constructor(id: string, startingPos: Vec2);
    startPlaying(name: string): void;
    getName(): string;
}
export declare function getGremlinFromID(id: string, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getGremlinFromIndex(index: number, gremlinArray: Array<Gremlin>): Gremlin | void;
export declare function getIndexFromGremlin(g: Gremlin, gremlinArray: Array<Gremlin>): number | void;
export declare function getPlayingGremlins(gremlinArray: Array<Gremlin>): Array<Gremlin>;
