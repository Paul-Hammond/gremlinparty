export default class GremlinClient {
    private socket;
    private gremlinID;
    private gremlinUserName;
    private selfGremlin;
    private fellowGremlins;
    private isPlaying;
    private dt;
    private timeOfLastUpdate;
    private gCanvas;
    private mousePos;
    constructor();
    start(): void;
    receiveIDFromUser(name: string): void;
    private gsWelcome;
    private gsFallenGremlin;
    private gsGremlinPackage;
    private loop;
    private handleKeyDown;
    private handleKeyUp;
    private handleMouseMove;
    private update;
    private render;
}
