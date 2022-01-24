// this.BB is the region that activates the button
// this.buttonBB is the region that can be clicked to transition from level to level

class Portal {
    constructor(game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY) {
        Object.assign(this, {game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY});
        this.changeOnNextUpdate = false; // this is used so we can paint a loading screen before transitioning levels

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/portals.png");
        this.animation = new AnimationGroup(this.spritesheet, this.portalTypeIndex * 32 * 4, 0, 32, 32, 4, 0.15, false, true);

        this.buttonX = (this.textX - 3);
        this.buttonY = (this.textY - 42);
        this.buttonWidth = 35 * text.length;
        if (text.includes("1") || text.includes("2")) { 
            // numbers seem to cause weird problems.. this is a fix to make the width correct.
            this.buttonWidth -= 30;
        }
 
        this.buttonHeight = 55;

        this.showingButton = false;
        this.mouseBB = new BoundingBox(0, 0, 1, 1);
        this.BB = new BoundingBox(bbX, 
                                  bbY, 
                                  PARAMS.SCALE / 2 * 32, 
                                  PARAMS.SCALE / 2 * 32);
        this.buttonBB = new BoundingBox(this.buttonX + this.game.camera.x,
                                        this.buttonY + this.game.camera.y,
                                        this.buttonWidth,
                                        this.buttonHeight);
    }

    update() {
        if (this.changeOnNextUpdate) {
            this.game.camera.travelTo(this.destinationLevel); 
        } else {
            this.showingButton = this.game.camera.hero.hitBB.collide(this.BB);

            this.buttonBB = new BoundingBox(this.buttonX,
                this.buttonY,
                this.buttonWidth,
                this.buttonHeight);
    
            if (this.game.mouse) {
                this.mouseBB = new BoundingBox(this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y, 1, 1);
            }
    
            if (this.showingButton && this.game.clicked && this.game.click && this.mouseBB.collide(this.buttonBB)) {
                this.changeOnNextUpdate = true;
                this.mouseBB = new BoundingBox(0, 0, 1, 1);
                this.game.click = null;
            }
        }
    }

    draw(ctx) {
        if (this.portalTypeIndex >= 0) {
            this.animation.drawFrame(this.game.clockTick, 
                                    ctx, 
                                    this.bbX - this.game.camera.x,
                                    this.bbY - this.game.camera.y,
                                    PARAMS.SCALE / 2);
        }
        if (this.showingButton) {
            ctx.save();
            ctx.font = 48 + 'px "silkscreennormal"';
            ctx.lineWidth = 10;
            // TODO: FIGURE OUT IF SNOW BIOME TO MAKE TEXT BLACK OR SOMETHING
            ctx.fillStyle = "White";
            ctx.strokeStyle = "White"; 
            if (!this.changeOnNextUpdate && this.mouseBB.collide(this.buttonBB)) {
                ctx.fillStyle = "LightGreen";
                ctx.strokeStyle = "LightGreen"; 
            }
            ctx.fillText(this.text, 
                         this.textX - this.game.camera.x,
                         this.textY - this.game.camera.y);
            ctx.strokeRect(this.buttonX - this.game.camera.x,
                           this.buttonY - this.game.camera.y,
                           this.buttonWidth,
                           this.buttonHeight);
            if (this.changeOnNextUpdate) {
                ctx.fillStyle = 'rgba(0, 0, 0, .7)';
                ctx.fillRect(0, 0, PARAMS.CANVAS_DIMENSION, PARAMS.CANVAS_DIMENSION);
                ctx.fillStyle = 'White';
                ctx.fillText("loading...", PARAMS.CANVAS_DIMENSION / 2 - 120, PARAMS.CANVAS_DIMENSION * 0.75);
            }
            ctx.restore();
        }
         
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    }
}