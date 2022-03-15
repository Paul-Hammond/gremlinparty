export default class gcGremlin {
    constructor(id, name, startingPos) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
        this.sprite = new Image();
        this.sprite.src = '/res/gremlins/gremlin-default.png';
    }
    getPosition() {
        const pos = this.pos;
        return pos;
    }
}
