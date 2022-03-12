export default class gcGremlin {
    private gremlinID: string;
    private username: string;
    private pos: number;

    constructor(id: string, name: string, startingPos: number) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
    }
}