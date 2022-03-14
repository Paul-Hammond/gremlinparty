export default class GremlinClient {
    private socket;
    private gremlinID;
    private gremlinUserName;
    private fellowGremlins;
    private isPlaying;
    private dt;
    private timeOfLastUpdate;
    private gCanvas;
    private hasEmittedThisFrame;
    constructor();
    start(): void;
    receiveIDFromUser(name: string): void;
    private gsWelcome;
    private gsGremlinPackage;
    private shoutID;
    private loop;
    private handleKeyDown;
    private handleKeyUp;
    private update;
    private render;
}
