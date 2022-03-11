export default class GremlinPlayer {
    private gremlinID: string;
    private username: string;

    constructor(username: string, gremlinID: string) {
        this.username = username;
        this.gremlinID = gremlinID;
    }
    getGremlinID(): string {
        return this.gremlinID;
    }
    getUsername(): string {
        return this.username;
    }
}