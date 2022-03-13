import gcGremlin from '../player/gcgremlin.js';
export default class GremlinCanvas {
    private canvas;
    private ctx;
    private fpsIndicator;
    private timeFpsIndicatorLastUpdated;
    private fellowGremlins;
    constructor();
    initCanvas(): void;
    syncPlayers(gremlins: Array<gcGremlin>): void;
    update(dt: number): void;
    render(): void;
}
