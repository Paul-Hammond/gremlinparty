import Vec2 from '../math/gcVec2.js';
import { lerp } from '../math/lerp.js';
import Size from '../math/size.js';
import Collider from './core/collider.js';
export default class gcGremlin extends Collider {
    constructor(id, name, startingPos, freg) {
        let sprite = new Image();
        if (freg) {
            sprite.src = '/res/gremlins/freg.png';
        }
        else {
            sprite.src = '/res/gremlins/gremlin-default.png';
        }
        super(new Size(sprite.width, sprite.height));
        this.gremlinID = id;
        this.name = name;
        this.pos = startingPos;
        this.freg = freg;
        this.targetPos = startingPos;
        this.centerPos = startingPos;
        this.aimingPos = startingPos;
        this.sprite = sprite;
    }
    getPosition() {
        const pos = this.pos;
        return pos;
    }
    updateAimingPos(newPos) {
        this.aimingPos = newPos;
    }
    // Paul - (03.15.22)
    update(dt) {
        // lerp position to target position by delta time divded by the server tick rate of 100ms 
        this.pos = new Vec2(lerp(this.pos.x, this.targetPos.x, (dt) / 50), lerp(this.pos.y, this.targetPos.y, (dt) / 50));
        this.centerPos.x = this.pos.x + this.sprite.width / 2;
        this.centerPos.y = this.pos.y + this.sprite.height / 2;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
        //(3/16/22) nameLength is required to be able to center the gremlin's name above their head
        const nameLength = ctx.measureText(this.name).width;
        ctx.fillText(this.name, this.pos.x + (this.sprite.width / 2) - (nameLength / 2), this.pos.y - 25);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.centerPos.x, this.centerPos.y);
        ctx.lineTo(this.aimingPos.x, this.aimingPos.y);
        ctx.stroke();
    }
}
