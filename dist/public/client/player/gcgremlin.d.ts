export default class gcGremlin {
    readonly gremlinID: string;
    readonly username: string;
    pos: number;
    constructor(id: string, name: string, startingPos: number);
    getPosition(): number;
}
