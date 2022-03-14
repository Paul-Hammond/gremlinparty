import GremlinState from './gremlinstate.js';
import { getGremlinFromID } from '../gremlin.js';
export default class MovementState extends GremlinState {
    constructor(ownerID) {
        super(ownerID);
        this.direction = Direction.Idle;
        this.ownerID = ownerID;
    }
    addDirection(dir) {
        switch (dir) {
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
    removeDirection(dir) {
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
    update(dt, gremlins) {
        const owner = getGremlinFromID(this.ownerID, gremlins);
        const ownerName = owner.getName();
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
export var Direction;
(function (Direction) {
    Direction[Direction["Idle"] = 0] = "Idle";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["UpRight"] = 2] = "UpRight";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["DownRight"] = 4] = "DownRight";
    Direction[Direction["Down"] = 5] = "Down";
    Direction[Direction["DownLeft"] = 6] = "DownLeft";
    Direction[Direction["Left"] = 7] = "Left";
    Direction[Direction["UpLeft"] = 8] = "UpLeft";
})(Direction || (Direction = {}));
