export default class GremlinCanvas {
    constructor() {
        console.log('GremlinCanvas constructor');
        this.fpsIndicator = '';
        this.timeFpsIndicatorLastUpdated = performance.now();
        this.fellowGremlins = new Array();
    }
    initCanvas() {
        this.canvas = document.getElementById('gremlin-canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    syncPlayers(gremlins) {
        this.fellowGremlins = gremlins;
    }
    update(dt) {
        if (performance.now() - this.timeFpsIndicatorLastUpdated > 250) {
            this.fpsIndicator = 'fps:' + Math.floor(((1 / dt) * 1000));
            this.timeFpsIndicatorLastUpdated = performance.now();
        }
    }
    render() {
        this.ctx.fillStyle = `rgb(140, 140, 140)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '24px helvetica';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.fpsIndicator, 5, 20);
        this.fellowGremlins.forEach(gremlin => {
            this.ctx.drawImage(gremlin.sprite, gremlin.pos.x, gremlin.pos.y);
            const nameLength = this.ctx.measureText(gremlin.username).width;
            this.ctx.fillText(gremlin.username, gremlin.pos.x + (gremlin.sprite.width / 2) - (nameLength / 2), gremlin.pos.y - 25);
        });
    }
}
