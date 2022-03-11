export default class GremlinWorld {
    constructor() {
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
        this.isAlive = false;
        this.timeOfLastFpsReporting = performance.now();
    }
}
GremlinWorld.counter = 0;
