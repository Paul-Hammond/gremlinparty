export default class GremlinClient {
    private socket;
    private gremlinID;
    private gremlinUserName;
    private fellowGremlins;
    private isPlaying;
    private dt;
    private timeOfLastUpdate;
    private gCanvas;
    constructor();
    start(): void;
    receiveIDFromUser(name: string): void;
    private gsWelcome;
    private gsGremlinPackage;
    private shoutID;
    private loop;
    private update;
    private render;
}
