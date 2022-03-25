export default class Collider {
    constructor(size) {
        this.isColliding = false;
        this.size = size;
    }
    axisAlignedBoundBox(pos, posWH, pos2, pos2WH) {
        if (pos.x < pos2.x + pos2WH.x &&
            pos.x + posWH.x > pos2.x && pos.y < pos2.y + pos2WH.y &&
            posWH.y + pos.y > pos2.y) {
            return true;
        }
        return false;
    }
    update(dt) {
    }
}
