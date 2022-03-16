import Vec2 from '../math/gcVec2.js';
import { lerp } from '../math/lerp.js';
export default class gcGremlin {
    constructor(id, name, startingPos) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
        this.targetPos = startingPos;
        this.sprite = new Image();
        this.sprite.src = '/res/gremlins/gremlin-default.png';
    }
    getPosition() {
        const pos = this.pos;
        return pos;
    }
    // Paul - (03.15.22)
    update(dt) {
        // lerp position to target position by delta time divded by the server tick rate of 100ms 
        this.pos = new Vec2(lerp(this.pos.x, this.targetPos.x, (dt) / 50), lerp(this.pos.y, this.targetPos.y, (dt) / 50));
    }
}
