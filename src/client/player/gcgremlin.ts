import Vec2 from '../math/gcVec2.js';

export default class gcGremlin {
    readonly gremlinID: string;
    readonly username: string;
    public pos: Vec2;
    //readonly isPlayer: boolean;

    //(3/13/22) client specific
    public sprite: HTMLImageElement;

    constructor(id: string, name: string, startingPos: Vec2) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
        this.sprite = new Image();
        this.sprite.src = '/res/gremlins/gremlin-default.png';
    }

    public getPosition(): Vec2 {
        const pos: Vec2 = this.pos;
        return pos;
    }
}