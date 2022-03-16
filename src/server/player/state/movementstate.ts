import GremlinState from './gremlinstate.js';
import Gremlin, { getGremlinFromID } from '../gremlin.js';

export default class MovementState extends GremlinState {
    public ownerID: string;

    private upPressed: boolean = false;
    private downPressed: boolean = false;
    private leftPressed: boolean = false;
    private rightPressed: boolean = false;

    private direction: Direction = Direction.Idle;

    private speed: number;
    private diagonalSpeed: number;

    constructor(ownerID: string) {
        super(ownerID);
        this.ownerID = ownerID;
        this.speed = .5;
        this.diagonalSpeed = this.speed * (Math.sqrt(2) / 2);
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

        //(3/15/22) determine gremlin direction
        if (this.upPressed && this.downPressed && this.leftPressed && this.rightPressed) {
            this.direction = Direction.Idle;
        }
        else if (this.upPressed) {
            if (this.leftPressed && !this.rightPressed && !this.downPressed) {
                this.direction = Direction.UpLeft;
            }
            else if (this.rightPressed && !this.leftPressed && !this.downPressed) {
                this.direction = Direction.UpRight;
            }
            else if (this.downPressed && this.leftPressed) {
                this.direction = Direction.Left;
            }
            else if (this.downPressed && this.rightPressed) {
                this.direction = Direction.Right;
            }
            else if (this.downPressed) {
                this.direction = Direction.Idle;
            }
            else {
                this.direction = Direction.Up;
            }
        }
        else if (this.downPressed) {
            if (this.leftPressed && !this.rightPressed) {
                this.direction = Direction.DownLeft;
            }
            else if (this.rightPressed && !this.leftPressed) {
                this.direction = Direction.DownRight;
            }
            else {   
                this.direction = Direction.Down;
            }
        }
        else if (this.leftPressed && !this.rightPressed ||
            this.upPressed && this.downPressed && this.leftPressed) {
            this.direction = Direction.Left;
        }
        else if (this.rightPressed && !this.leftPressed) {
            this.direction = Direction.Right;
        }

        else {
            this.direction = Direction.Idle;
        }

        switch (this.direction) {
            case Direction.Up:
                owner.pos.offsetY(-this.speed * dt);
                break;
            case Direction.UpLeft:
                owner.pos.offsetXY(-this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
                break;
            case Direction.UpRight:
                owner.pos.offsetXY(this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
                break;
            case Direction.Down:
                owner.pos.offsetY(this.speed * dt);
                break;
            case Direction.DownLeft:
                owner.pos.offsetXY(-this.diagonalSpeed * dt, this.diagonalSpeed * dt);
                break;
            case Direction.DownRight:
                owner.pos.offsetXY(this.diagonalSpeed * dt, this.diagonalSpeed * dt);
                break;
            case Direction.Left:
                owner.pos.offsetX(-this.speed * dt);
                break;
            case Direction.Right:
                owner.pos.offsetX(this.speed * dt);
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