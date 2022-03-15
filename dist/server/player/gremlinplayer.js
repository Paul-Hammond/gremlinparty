export default class GremlinPlayer {
    constructor(username, gremlinID) {
        this.username = username;
        this.gremlinID = gremlinID;
    }
    getGremlinID() {
        return this.gremlinID;
    }
    getUsername() {
        return this.username;
    }
}
