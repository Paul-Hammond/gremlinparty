export default class GremlinAddress {
    private ID: string;
    private username: string;

    constructor(username: string, ID: string) {
        this.username = username;
        this.ID = ID;
    }
    getGremlinID(): string {
        return this.ID;
    }
    getUsername(): string {
        return this.username;
    }
}