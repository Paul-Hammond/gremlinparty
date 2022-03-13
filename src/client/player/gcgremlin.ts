export default class gcGremlin {
    readonly gremlinID: string;
    readonly username: string;
    public pos: number;

    constructor(id: string, name: string, startingPos: number) {
        this.gremlinID = id;
        this.username = name;
        this.pos = startingPos;
    }

    public getPosition(): number {
        const pos: number = this.pos;
        return pos;
    }
}