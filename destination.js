class Destination {

    constructor(game, originX, originY, neighbors, stoppable) {
        Object.assign(this, {game, originX, originY, neighbors, stoppable});
        this.scale = 3 * PARAMS.SCALE;
    };

    update() {};

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = this.stoppable ? "Red" : "Brown";
        ctx.beginPath();
        ctx.moveTo(this.originX - this.game.camera.x, this.originY - this.game.camera.y);
        ctx.lineTo(this.originX - this.game.camera.x + this.neighbors.prev.x * (100 - this.scale / 2), this.originY - this.game.camera.y + this.neighbors.prev.y * (100 - this.scale / 2));
        ctx.stroke();
        ctx.strokeRect(this.originX - this.scale / 2 - this.game.camera.x, this.originY - this.scale / 2 - this.game.camera.y, this.scale, this.scale);
        ctx.fillRect(this.originX - this.scale / 2 - this.game.camera.x, this.originY - this.scale / 2 - this.game.camera.y, this.scale, this.scale);
    };
};