export default class GremlinWorld {
    constructor() {
        GremlinWorld.numGremlins = 0;
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
        this.worldUpdatePackage = 0;
        console.log('calling gremlinWorld constructor');
    }
    addGremlin(gremlin) {
        GremlinWorld.numGremlins++;
    }
    removeGremlin() {
        GremlinWorld.numGremlins--;
    }
    createGremlinWorldPackage() {
        console.log(GremlinWorld.numGremlins);
        if (GremlinWorld.numGremlins >= 1) {
        }
    }
    static getWorldUpdatePackage() {
        return GremlinWorld.numGremlins;
    }
}
GremlinWorld.numGremlins = 0;
