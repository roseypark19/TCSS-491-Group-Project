class MapTile {
        
    constructor(game, x, y, spritePath, spriteX, spriteY, blockwidth, scale, collideable) { 
        // possibly add a final optional parameter for minimap draw color
        Object.assign(this, {game, x, y, spritePath, spriteX, spriteY, blockwidth, scale, collideable});
        
        this.animator = new AnimationGroup(ASSET_MANAGER.getAsset(this.spritePath), 
                                           spriteX, spriteY, this.blockwidth, this.blockwidth, 1, 1, false, true);
        this.BB = new BoundingBox(this.x, this.y, this.blockwidth * this.scale,
                                  this.blockwidth * this.scale);   
    };

    update() {};

    alterTileAnimation(frameCount, frameDuration, framePadding = 0) {
        let anim = this.animator;
        this.animator = 
            new AnimationGroup(ASSET_MANAGER.getAsset(this.spritePath), 
                this.spriteX, this.spriteY, this.blockwidth, this.blockwidth, frameCount, frameDuration, anim.reverse, anim.loop, framePadding);
    };

    updateElapsedTime() {
        this.animator.elapsedTime += this.game.clockTick;
        if (this.animator.isDone()) {
            this.animator.reset();
        }
    };

    drawMmap(ctx) {
        // let paint = false;
        // if (this.spritesheet === "./sprites/level/floor.png") {
        //     paint = true;
        //     ctx.strokeStyle = rgb(97, 112, 114);
        //     ctx.fillStyle = rgb(97, 112, 114);
        // } else if (this.collideable) {
        //     paint = true;
        //     ctx.strokeStyle = rgb(48, 48, 48);
        //     ctx.fillStyle = rgb(48, 48, 48);
        // }
        // if (paint) {
        //     ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
        //                    this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
        //                    PARAMS.BLOCKWIDTH * PARAMS.MMAP_SCALE, PARAMS.BLOCKWIDTH * PARAMS.MMAP_SCALE);
        //     ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
        //                  this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
        //                  PARAMS.BLOCKWIDTH * PARAMS.MMAP_SCALE, PARAMS.BLOCKWIDTH * PARAMS.MMAP_SCALE);
        // }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        if (this.collideable && PARAMS.DEBUG) {
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class PropTile {
    constructor(game, x, y, spritePath, spriteX, spriteY, offsetX, offsetY, width, height, collideable, scale = PARAMS.SCALE) {
        Object.assign(this, {game, x, y, spritePath, spriteX, spriteY, offsetX, offsetY, width, height, scale, collideable});
        
        this.animator = new AnimationGroup(ASSET_MANAGER.getAsset(this.spritePath), 
                                           spriteX, spriteY, width, height, 1, 1, false, true);
        this.BB = new BoundingBox(this.x + this.offsetX * this.scale, this.y + this.offsetY * this.scale, 
                                  this.width * this.scale, this.height * this.scale);       
    };

    update() {};

    // drawMmap(ctx) {
    //     let paint = false;
    //     if (this.spritesheet === "./sprites/level/floor.png") {
    //         paint = true;
    //         ctx.strokeStyle = rgb(97, 112, 114);
    //         ctx.fillStyle = rgb(97, 112, 114);
    //     } else if (this.collideable) {
    //         paint = true;
    //         ctx.strokeStyle = rgb(48, 48, 48);
    //         ctx.fillStyle = rgb(48, 48, 48);
    //     }
    //     if (paint) {
    //         ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
    //                        this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
    //                        8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
    //         ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
    //                      this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
    //                      8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
    //     }
    // };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + this.offsetX * this.scale, 
                                                          this.y - this.game.camera.y + this.offsetY * this.scale, this.scale);
        if (this.collideable && PARAMS.DEBUG) {
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

