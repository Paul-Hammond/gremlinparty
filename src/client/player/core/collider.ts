import Vec2 from "../../math/gcVec2";
import Size from "../../math/size";

export default class Collider {
    private size: Size;
    private isColliding: boolean = false;

    constructor(size: Size) {
        this.size = size;
    }

    public axisAlignedBoundBox(pos: Vec2, posWH: Vec2, pos2: Vec2, pos2WH: Vec2,): boolean {
        if (pos.x < pos2.x + pos2WH.x &&
            pos.x + posWH.x > pos2.x && pos.y < pos2.y + pos2WH.y &&
            posWH.y + pos.y > pos2.y) {
            return true;
        }
        return false;
    }

    public update(dt: number): void {
    }
}