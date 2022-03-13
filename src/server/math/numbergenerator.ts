import Vec2 from './vec2.js';

export default class NumberGenerator {
    public static generateVec(min: Vec2, max: Vec2): Vec2 {
        const randomX: number = Math.floor(Math.random() * (max.x - min.x) + min.x);
        const randomY: number = Math.floor(Math.random() * (max.y - min.y) + min.y);
        return new Vec2(randomX, randomY);
    } 
}