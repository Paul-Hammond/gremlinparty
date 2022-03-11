export default class GremlinWorld {
    private dt: number;
    private timeOfLastUpdate: number;
    private static counter = 0;
    
    constructor() {
        this.dt = 0;
        this.timeOfLastUpdate = performance.now();
    }

    //(3/11/22) create a heartbeat function that emits a GremlinWorldPackage every 1/3rd second
    //heartbeat function will act as update. first step is to read the queue of GremlinMessages
    //and change state according to those. Then, let everything else act according to its own state
    //with the passage of time
}