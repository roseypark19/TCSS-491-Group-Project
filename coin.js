class Coin {

    constructor(game, x, y, value) {
        Object.assign(this, {game, value});
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.scale = PARAMS.SCALE - 2;
        this.x = x - 8 * this.scale;
        this.y = y - 8 * this.scale;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/items/coin.png");
        this.animation = new AnimationGroup(this.spritesheet, 0, 0, 16, 16, 14, 0.06, false, true);
        this.updateBB();
    };

    update() {};

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 16 * this.scale, 16 * this.scale);
        this.collisionBB = new BoundingBox(this.BB.center.x - 4 * this.scale, this.BB.center.y - 4 * this.scale, 8 * this.scale, 8 * this.scale);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.collisionBB.x - this.game.camera.x, this.collisionBB.y - this.game.camera.y, this.collisionBB.width, this.collisionBB.height);
        }
    };
};