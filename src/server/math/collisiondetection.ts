import Vec2 from "./vec2.js";

// Paul - (03.16.22)
export default class CollisionDetector {
    // simple collision detection algorithm based on coordinates, width, height
    // assumes collision box doesn't rotate 
    static axisAlignedBoundBox(pos: Vec2, posWH: Vec2, pos2: Vec2, pos2WH: Vec2,): boolean {
        if (pos.x < pos2.x + pos2WH.x &&
            pos.x + posWH.x > pos2.x && pos.y < pos2.y + pos2WH.y &&
            posWH.y + pos.y > pos2.y) {
            return true;
        }
        return false;
    }
}