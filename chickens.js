class Hen {
    constructor(game, x, y, lookingRight = true) {
        Object.assign(this, {game, x, y, lookingRight});
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.BB = new BoundingBox(this.x, this.y, 1, 1); // for game engine paint radius

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/biomes/town/HenIdle.png");
        this.animation = new AnimationGroup(this.spritesheet, 0, this.lookingRight ? 0 : 8, 8, 8, 19, 0.25, false, true);
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    }
};


class Chick {
    constructor(game, x, y, lookingRight = true) {
        Object.assign(this, {game, x, y, lookingRight});
        
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.BB = new BoundingBox(this.x, this.y, 1, 1); // for game engine paint radius

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/biomes/town/ChickIdle.png");
        this.animation = new AnimationGroup(this.spritesheet, 0, this.lookingRight ? 0 : 8, 8, 8, 19, 0.25, false, true);
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    }
};

class Penguin {
    constructor(game, x, y, lookingRight = true) {
        Object.assign(this, {game, x, y, lookingRight});
        
        this.npc = true;
        this.id = ++PARAMS.NPC_ID;
        this.BB = new BoundingBox(this.x, this.y, 1, 1); // for game engine paint radius

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/biomes/snow/penguin.png");
        this.animation = new AnimationGroup(this.spritesheet, 0, this.lookingRight ? 0 : 32, 32, 32, 16, 0.25, false, true);
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    }
};