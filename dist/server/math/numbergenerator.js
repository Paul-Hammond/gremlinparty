import Vec2 from './vec2.js';
export default class NumberGenerator {
    static generateVec(min, max) {
        const randomX = Math.floor(Math.random() * (max.x - min.x) + min.x);
        const randomY = Math.floor(Math.random() * (max.y - min.y) + min.y);
        return new Vec2(randomX, randomY);
    }
}
