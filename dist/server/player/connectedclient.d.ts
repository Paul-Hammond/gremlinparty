export default class ConnectedClient {
    private id;
    private username;
    constructor(ID: string, username: string);
    getGremlinID(): string;
    getUsername(): string;
}
