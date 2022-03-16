import Vec2 from '../math/gcVec2.js';
import { lerp } from '../math/lerp.js';

export default class gcGremlin {
    readonly gremlinID: string;
    readonly username: string;
    public pos: Vec2;
    public targetPos: Vec2;
    //readonly isPlayer: boolean;

    //(3/13/22) client specific
    public sprite: HTMLImageElement;

    constructor(id: string, name: string, startingPos: Vec2) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
        this.targetPos = startingPos;
        this.sprite = new Image();
        this.sprite.src = '/res/gremlins/gremlin-default.png';
    }

    public getPosition(): Vec2 {
        const pos: Vec2 = this.pos;
        return pos;
    }

    // Paul - (03.15.22)
    public update(dt: number): void {
        // lerp position to target position by delta time divded by the server tick rate of 100ms 
        this.pos = new Vec2(lerp(this.pos.x, this.targetPos.x, (dt) / 100 % 1), lerp(this.pos.y, this.targetPos.y, (dt) / 100 % 1));
    }
}