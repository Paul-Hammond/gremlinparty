export default class GremlinAddress {
    private ID;
    private username;
    constructor(username: string, ID: string);
    getGremlinID(): string;
    getUsername(): string;
}
