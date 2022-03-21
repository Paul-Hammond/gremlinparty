import Vec2 from '../math/gcVec2.js';
import { lerp } from '../math/lerp.js';

export default class gcGremlin {
    readonly gremlinID: string;
    readonly name: string;
    readonly freg: boolean;
    public pos: Vec2;
    public targetPos: Vec2;
    private centerPos: Vec2;

    public aimingPos: Vec2;

    //(3/13/22) client specific
    private sprite: HTMLImageElement;

    constructor(id: string, name: string, startingPos: Vec2, freg: boolean) {
        this.gremlinID = id;
        this.name = name;
        this.pos = startingPos;
        this.freg = freg;
        this.targetPos = startingPos;
        this.centerPos = startingPos;
        this.aimingPos = startingPos;
        this.sprite = new Image();
        this.sprite.src = '/res/gremlins/gremlin-default.png';
    }

    public getPosition(): Vec2 {
        const pos: Vec2 = this.pos;
        return pos;
    }

    public updateAimingPos(newPos: Vec2): void {
        this.aimingPos = newPos;
    }

    // Paul - (03.15.22)
    public update(dt: number): void {
        // lerp position to target position by delta time divded by the server tick rate of 100ms 
        this.pos = new Vec2(lerp(this.pos.x, this.targetPos.x, (dt) / 50), lerp(this.pos.y, this.targetPos.y, (dt) / 50));
        this.centerPos.x = this.pos.x + this.sprite.width / 2;
        this.centerPos.y = this.pos.y + this.sprite.height / 2;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
        //(3/16/22) nameLength is required to be able to center the gremlin's name above their head
        const nameLength: number = ctx.measureText(this.name).width; 
        ctx.fillText(this.name, this.pos.x + (this.sprite.width / 2) - (nameLength / 2), this.pos.y - 25);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.centerPos.x, this.centerPos.y);
        ctx.lineTo(this.aimingPos.x, this.aimingPos.y);
        ctx.stroke();
    }
}