export default class ConnectedClient {
    constructor(ID, username) {
        this.username = username;
        this.id = ID;
    }
    getGremlinID() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
}
