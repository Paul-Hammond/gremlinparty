import GremlinState from './gremlinstate.js';
import Gremlin, { getGremlinFromID } from '../gremlin.js';

export default class MovementState extends GremlinState {
    public ownerID: string;

    private upPressed: boolean = false;
    private downPressed: boolean = false;
    private leftPressed: boolean = false;
    private rightPressed: boolean = false;

    private direction: Direction = Direction.Idle;

    constructor(ownerID: string) {
        super(ownerID);
        this.ownerID = ownerID;
    }

    public addDirection(dir: Direction): void {
        switch(dir) {
            case Direction.Up:
                this.upPressed = true;
                break;
            case Direction.Down:
                this.downPressed = true;
                break;
            case Direction.Left:
                this.leftPressed = true;
                break;
            case Direction.Right:
                this.rightPressed = true;
                break;
        }

    }

    public removeDirection(dir: Direction): void {
        switch (dir) {
            case Direction.Up:
                this.upPressed = false;
                break;
           case Direction.Down:
                this.downPressed = false;
                break;
           case Direction.Left:
                this.leftPressed = false;
                break;
            case Direction.Right:
                this.rightPressed = false;
                break;         
        }
    }

    public update(dt: number, gremlins: Array<Gremlin>) {
        const owner: Gremlin = getGremlinFromID(this.ownerID, gremlins)!;
        const ownerName: string = owner.getName();

        //(3/15/22) determine gremlin direction


        if (this.upPressed) {
            if (this.leftPressed) {
                this.direction = Direction.UpLeft;
            }
            else if (this.rightPressed) {
                this.direction = Direction.UpRight;
            }
            else {
                this.direction = Direction.Up;
            }
        }
        else if (this.downPressed) {
            if (this.leftPressed) {
                this.direction = Direction.DownLeft;
            }
            else if (this.rightPressed) {
                this.direction = Direction.DownRight;
            }
            else {   
                this.direction = Direction.Down;
            }
        }
        else if (this.leftPressed) {
            this.direction = Direction.Left;
        }
        else if (this.rightPressed) {
            this.direction = Direction.Right;
        }
        else {
            this.direction = Direction.Idle;
        }

        switch (this.direction) {
            case Direction.Up:
                owner.pos.offsetY(-.15 * dt);
                break;
            case Direction.UpLeft:
                owner.pos.offsetXY(-.11 * dt, -.11 * dt);
                break;
            case Direction.UpRight:
                owner.pos.offsetXY(.11 * dt, -.11 * dt);
                break;
            case Direction.Down:
                owner.pos.offsetY(.15 * dt);
                break;
            case Direction.DownLeft:
                owner.pos.offsetXY(-.11 * dt, .11 * dt);
                break;
            case Direction.DownRight:
                owner.pos.offsetXY(.11 * dt, .11 * dt);
                break;
            case Direction.Left:
                owner.pos.offsetX(-.11 * dt);
                break;
            case Direction.Right:
                owner.pos.offsetX(.11 * dt);
                break;
            case Direction.Idle:
                break;
        } 

    }
}

export enum Direction {
    Idle,
    Up,
    UpRight,
    Right,
    DownRight,
    Down,
    DownLeft,
    Left,
    UpLeft
}