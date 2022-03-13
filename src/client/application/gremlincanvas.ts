import gcGremlin from '../player/gcgremlin.js';

export default class GremlinCanvas {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;

    private fpsIndicator: string;
    private timeFpsIndicatorLastUpdated: number;

    private fellowGremlins: Array<gcGremlin>;

    constructor() {
        console.log('GremlinCanvas constructor');

       
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();

        this.fellowGremlins = new Array();
    }

    public initCanvas(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('gremlin-canvas'); 
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    }

    public syncPlayers(gremlins: Array<gcGremlin>) {
        this.fellowGremlins = gremlins;
    }
 
    public update(dt: number): void {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1/dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }

    public render(): void {
        this.ctx.fillStyle = `rgb(140, 140, 140)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '24px helvetica';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.fpsIndicator, 5, 20);

        for (let i = 0; i < this.fellowGremlins.length; i++) {
            this.ctx.fillText(this.fellowGremlins[i].username, 200, 20 + (i * 25));
        }
    }
}