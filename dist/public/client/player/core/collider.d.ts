import Vec2 from "../../math/gcVec2";
import Size from "../../math/size";
export default class Collider {
    private size;
    private isColliding;
    constructor(size: Size);
    axisAlignedBoundBox(pos: Vec2, posWH: Vec2, pos2: Vec2, pos2WH: Vec2): boolean;
    update(dt: number): void;
}
