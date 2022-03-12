export default class GremlinWorld {
    private dt: number;
    private timeOfLastUpdate: number;
    private static numGremlins: number = 0;
    
    
    constructor() {
        GremlinWorld.numGremlins = 0;

        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
        console.log('calling gremlinWorld constructor');
    }

    public addGremlin(gremlin: string): void {
        GremlinWorld.numGremlins++;
    }

    public removeGremlin(): void {
        GremlinWorld.numGremlins--;
    }

    public createGremlinWorldPackage(): void {
        console.log(GremlinWorld.numGremlins);
        if (GremlinWorld.numGremlins >= 1) {

        }
    }

    public static getWorldUpdatePackage(): number {
        return GremlinWorld.numGremlins;
    }

    //(3/11/22) create a heartbeat function that emits a GremlinWorldPackage every 1/3rd second
    //heartbeat function will act as update. first step is to read the queue of GremlinMessages
    //and change state according to those. Then, let everything else act according to its own state
    //with the passage of time
}