import GremlinState from './gremlinstate.js';
import { getGremlinFromID } from '../gremlin.js';
import CollisionDetector from '../../math/collisiondetection.js';
import Vec2 from '../../math/vec2.js';
export default class MovementState extends GremlinState {
    constructor(ownerID) {
        super(ownerID);
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.direction = Direction.Idle;
        this.ownerID = ownerID;
        this.speed = .5;
        this.diagonalSpeed = this.speed * (Math.sqrt(2) / 2);
    }
    addDirection(dir) {
        switch (dir) {
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
    removeDirection(dir) {
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
    update(dt, gremlins) {
        const owner = getGremlinFromID(this.ownerID, gremlins);
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
        // Paul - (03.16.22) 
        // refactored movement into seperate functions
        // added a rough collision detection against other objects
        //      collides with other gremlins right now
        let pos = new Vec2(owner.pos.x, owner.pos.y);
        switch (this.direction) {
            case Direction.Up:
                this.moveUp(pos, dt, gremlins, owner);
                break;
            case Direction.UpLeft:
                this.moveUpLeft(pos, dt, gremlins, owner);
                break;
            case Direction.UpRight:
                this.moveUpRight(pos, dt, gremlins, owner);
                break;
            case Direction.Down:
                this.moveDown(pos, dt, gremlins, owner);
                break;
            case Direction.DownLeft:
                this.moveDownLeft(pos, dt, gremlins, owner);
                break;
            case Direction.DownRight:
                this.moveDownRight(pos, dt, gremlins, owner);
                break;
            case Direction.Left:
                this.moveLeft(pos, dt, gremlins, owner);
                break;
            case Direction.Right:
                this.moveRight(pos, dt, gremlins, owner);
                break;
            case Direction.Idle:
                break;
        }
    }
    // Paul - (03.16.22) 
    // check for collisions and move the gremlin if no collision exist
    moveUp(pos, dt, gremlins, owner) {
        pos.offsetY(-this.speed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == false) {
            owner.pos.offsetY(-this.speed * dt);
            return true;
        }
        return false;
    }
    moveDown(pos, dt, gremlins, owner) {
        pos.offsetY(this.speed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == false) {
            owner.pos.offsetY(this.speed * dt);
            return true;
        }
        return false;
    }
    moveLeft(pos, dt, gremlins, owner) {
        pos.offsetX(-this.speed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == false) {
            owner.pos.offsetX(-this.speed * dt);
            return true;
        }
        return false;
    }
    moveRight(pos, dt, gremlins, owner) {
        pos.offsetX(this.speed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == false) {
            owner.pos.offsetX(this.speed * dt);
            return true;
        }
        return false;
    }
    moveUpLeft(pos, dt, gremlins, owner) {
        pos.offsetXY(-this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == true) { // if we collide going diagonal, check if we can still move in x or y
            pos.x = owner.pos.x;
            if (this.moveUp(pos, dt, gremlins, owner) == false) {
                pos.y = owner.pos.y;
                this.moveLeft(pos, dt, gremlins, owner);
            }
        }
        else {
            owner.pos.offsetXY(-this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
        }
    }
    moveUpRight(pos, dt, gremlins, owner) {
        pos.offsetXY(this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == true) { // if we collide going diagonal, check if we can still move in x or y
            pos.x = owner.pos.x; // reset position 
            if (this.moveUp(pos, dt, gremlins, owner) == false) {
                pos.y = owner.pos.y; // reset position
                this.moveRight(pos, dt, gremlins, owner);
            }
        }
        else { // doesn't collide
            owner.pos.offsetXY(this.diagonalSpeed * dt, -this.diagonalSpeed * dt);
        }
    }
    moveDownLeft(pos, dt, gremlins, owner) {
        pos.offsetXY(-this.diagonalSpeed * dt, this.diagonalSpeed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == true) { // if we collide going diagonal, check if we can still move in x or y
            pos.x = owner.pos.x;
            if (this.moveDown(pos, dt, gremlins, owner) == false) {
                pos.y = owner.pos.y;
                this.moveLeft(pos, dt, gremlins, owner);
            }
        }
        else { // doesn't collide
            owner.pos.offsetXY(-this.diagonalSpeed * dt, this.diagonalSpeed * dt);
        }
    }
    // Paul - (03.16.22) 
    moveDownRight(pos, dt, gremlins, owner) {
        pos.offsetXY(this.diagonalSpeed * dt, this.diagonalSpeed * dt);
        if (this.checkCollision(this.ownerID, pos, gremlins) == true) { // if we collide going diagonal, check if we can still move in x or y
            pos.x = owner.pos.x;
            if (this.moveDown(pos, dt, gremlins, owner) == false) {
                pos.y = owner.pos.y;
                this.moveRight(pos, dt, gremlins, owner);
            }
        }
        else { // doesn't collide
            owner.pos.offsetXY(this.diagonalSpeed * dt, this.diagonalSpeed * dt);
        }
    }
    // Paul - (03.16.22)
    // run a collision check on each gremlin 
    // the number of checks needs to be reduced...hash table maybe? 
    checkCollision(gremlinId, pos, gremlins) {
        var collision = false;
        gremlins.forEach(g => {
            // 72 is the height and width of the gremlin currently. Need a better way to get the width/height of collision objects
            if (g.gremlinID != gremlinId && CollisionDetector.axisAlignedBoundBox(g.pos, new Vec2(72 - 15, 72 - 22), pos, new Vec2(72 - 15, 72 - 22))) {
                collision = true;
            }
        });
        return collision;
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
