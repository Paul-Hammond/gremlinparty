export default class GremlinWorld {
    private dt;
    private timeOfLastUpdate;
    private static numGremlins;
    constructor();
    addGremlin(gremlin: string): void;
    removeGremlin(): void;
    createGremlinWorldPackage(): void;
    static getWorldUpdatePackage(): number;
}
