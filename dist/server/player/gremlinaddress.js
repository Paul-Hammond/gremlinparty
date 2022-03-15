export default class GremlinAddress {
    constructor(username, ID) {
        this.username = username;
        this.ID = ID;
    }
    getGremlinID() {
        return this.ID;
    }
    getUsername() {
        return this.username;
    }
}
