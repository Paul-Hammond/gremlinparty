import GremlinState from './gremlinstate.js';
import Gremlin, { getGremlinFromID } from '../gremlin.js';

export default class MovementState extends GremlinState {
    public ownerID: string;
    private direction: Direction = Direction.Idle;

    constructor(ownerID: string) {
        super(ownerID);
        this.ownerID = ownerID;
    }

    public addDirection(dir: Direction): void {
        switch(dir) {
            case Direction.Up:
                if (this.direction == Direction.Left) {
                    this.direction = Direction.UpLeft;
                } 
                else if (this.direction == Direction.Right) {
                    this.direction = Direction.UpRight;
                }
                else {
                    this.direction = Direction.Up;
                }
                break;

            case Direction.Down:
                if (this.direction == Direction.Left) {
                    this.direction = Direction.DownLeft;
                }
                else if (this.direction == Direction.Right) {
                    this.direction = Direction.DownRight;
                }
                else {
                    this.direction = Direction.Down;
                }
                break;

            case Direction.Left:
                if (this.direction == Direction.Up) {
                    this.direction = Direction.UpLeft;
                }
                else if (this.direction == Direction.Down) {
                    this.direction = Direction.DownLeft;
                }
                else {
                    this.direction = Direction.Left;
                }
                break;

            case Direction.Right:
                if (this.direction == Direction.Up) {
                    this.direction = Direction.UpRight;
                }
                else if (this.direction == Direction.Down) {
                    this.direction = Direction.DownRight;
                }
                else {
                    this.direction = Direction.Right;
                }
                break;
        }

    }

    public removeDirection(dir: Direction): void {
        switch (dir) {
            case Direction.Up:
                if (this.direction == Direction.UpLeft) {
                    this.direction = Direction.Left;
                }
                else if (this.direction == Direction.UpRight) {
                    this.direction = Direction.Right;
                }
                else {
                    this.direction = Direction.Idle;
                }
                break;

           case Direction.Down:
                if (this.direction == Direction.DownLeft) {
                    this.direction = Direction.Left;
                }
                else if (this.direction == Direction.DownRight) {
                    this.direction = Direction.Right;
                }
                else {
                    this.direction = Direction.Idle;
                }
                break;

           case Direction.Left:
                if (this.direction == Direction.DownLeft) {
                    this.direction = Direction.Down;
                }
                else if (this.direction == Direction.UpLeft) {
                    this.direction = Direction.Up;
                }
                else {
                    this.direction = Direction.Idle;
                }
                break;
                
            case Direction.Right:
                if (this.direction == Direction.DownRight) {
                    this.direction = Direction.Down;
                }
                else if (this.direction == Direction.UpLeft) {
                    this.direction = Direction.Up;
                }
                else {
                    this.direction = Direction.Idle;
                }
                break;         
        }
    }

    public update(dt: number, gremlins: Array<Gremlin>) {
        const owner: Gremlin = getGremlinFromID(this.ownerID, gremlins)!;
        const ownerName: string = owner.getName();

        if (this.direction == Direction.Up) {
            owner.pos.offsetY((.15 * dt) * -1);
        }
        if (this.direction == Direction.Down) {
            owner.pos.offsetY(.15 * dt);
        }
        if (this.direction == Direction.Left) {
            owner.pos.offsetX((.15 * dt) * -1);
        }
        if (this.direction == Direction.Right) {
            owner.pos.offsetX(.15 * dt);
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