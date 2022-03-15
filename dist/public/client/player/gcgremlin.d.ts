import Vec2 from '../math/gcVec2.js';
export default class gcGremlin {
    readonly gremlinID: string;
    readonly username: string;
    pos: Vec2;
    targetPos: Vec2;
    sprite: HTMLImageElement;
    constructor(id: string, name: string, startingPos: Vec2);
    getPosition(): Vec2;
    update(dt: number): void;
}
