export default class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    offsetVec(offsetVec: Vec2): void;
    offsetX(offset: number): void;
    offsetY(offset: number): void;
    offsetXY(x: number, y: number): void;
}
