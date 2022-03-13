export default class gcGremlin {
    constructor(id, name, startingPos) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
    }
    getPosition() {
        const pos = this.pos;
        return pos;
    }
}
