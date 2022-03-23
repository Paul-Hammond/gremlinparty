export default class GremlinClient {
    private socket;
    private gremlinID;
    private gremlinUserName;
    private freg;
    private selfGremlin;
    private selfStartingPos;
    private fellowGremlins;
    private isPlaying;
    private dt;
    private timeOfLastUpdate;
    private gCanvas;
    private mousePos;
    private timeOfLastMouseEmit;
    constructor();
    start(): void;
    receiveIDFromUser(name: string, freg: boolean): void;
    private gsWelcome;
    private gsFallenGremlin;
    private gsGremlinPackage;
    private loop;
    private handleKeyDown;
    private handleKeyUp;
    private handleMouseMove;
    private handleMouseDown;
    private update;
    private render;
}
