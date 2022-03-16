import GremlinState from './gremlinstate.js';
import Gremlin from '../gremlin.js';
export default class MovementState extends GremlinState {
    ownerID: string;
    private upPressed;
    private downPressed;
    private leftPressed;
    private rightPressed;
    private direction;
    private speed;
    private diagonalSpeed;
    constructor(ownerID: string);
    addDirection(dir: Direction): void;
    removeDirection(dir: Direction): void;
    update(dt: number, gremlins: Array<Gremlin>): void;
}
export declare enum Direction {
    Idle = 0,
    Up = 1,
    UpRight = 2,
    Right = 3,
    DownRight = 4,
    Down = 5,
    DownLeft = 6,
    Left = 7,
    UpLeft = 8
}
