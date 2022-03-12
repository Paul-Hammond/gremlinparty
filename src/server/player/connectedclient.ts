export default class ConnectedClient {
    private id: string;
    private username: string;

    constructor(ID: string, username: string) {
        this.username = username;
        this.id = ID;
    }
    getGremlinID(): string {
        return this.id;
    }
    getUsername(): string {
        return this.username;
    }
}