// need a separate class to put a loading screen on top of everything
class LoadingScreen {
    constructor(game, x, y) {
        this.game = game;
        this.BB = new BoundingBox(x, y, 1, 1);
    }

    update() {
        console.log("updating")
    }

    draw(ctx) {
        ctx.font = 48 + 'px "silkscreennormal"';
        ctx.fillStyle = 'rgba(0, 0, 0, .7)';
        ctx.fillRect(0, 0, PARAMS.CANVAS_DIMENSION, PARAMS.CANVAS_DIMENSION);
        ctx.fillStyle = 'White';
        ctx.fillText("loading...", PARAMS.CANVAS_DIMENSION / 2 - 120, PARAMS.CANVAS_DIMENSION * 0.75);
    }
}



// this.BB is the region that activates the button
// this.buttonBB is the region that can be clicked to transition from level to level
// buttonWidth is the width of the rectangle drawn. Only meant to use if default alfo doesn't work
class Portal {
    constructor(game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY, buttonWidth = -1) {
        Object.assign(this, {game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY, buttonWidth});
        this.changeOnNextUpdate = false; // this is used so we can add/paint a loading screen before transitioning levels

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/portals.png");
        this.animation = new AnimationGroup(this.spritesheet, this.portalTypeIndex * 32 * 4, 0, 32, 32, 4, 0.15, false, true);

        this.textIsBlack = text.includes("Snow");

        this.buttonX = (this.textX - 3);
        this.buttonY = (this.textY - 42);

        if (this.buttonWidth < 0) {
            this.buttonWidth = 35 * text.length;  
        }

        if (text.includes("1") || text.includes("2")) { 
            // numbers seem to cause weird problems.. this is a fix to make the width correct.
            this.buttonWidth -= 30;
        }
 
        this.buttonHeight = 55;

        this.showingButton = false;
        this.mouseBB = new BoundingBox(0, 0, 1, 1);
        this.BB = new BoundingBox(bbX, 
                                  bbY, 
                                  bbWidth, 
                                  bbHeight);
        this.buttonBB = new BoundingBox(this.buttonX + this.game.camera.x,
                                        this.buttonY + this.game.camera.y,
                                        this.buttonWidth,
                                        this.buttonHeight);
    }

    update() {
        if (this.changeOnNextUpdate) {
            this.game.camera.travelTo(this.destinationLevel); 
        } else {
            // for loop prevents errors when the hero is not added to project... 
            // consider making these changes in the shops and other entities that interact with hero BB
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero || entity instanceof TinyHero) {
                    this.showingButton = entity.hitBB.collide(this.BB);
                }
            });    

            this.buttonBB = new BoundingBox(this.buttonX,
                this.buttonY,
                this.buttonWidth,
                this.buttonHeight);
    
            if (this.game.mouse) {
                this.mouseBB = new BoundingBox(this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y, 1, 1);
            }
    
            // check for valid button press of travel button
            if (this.showingButton && this.game.clicked && this.game.click && this.mouseBB.collide(this.buttonBB) ) { //&& isLevelUnlocked(this.destinationLevel)
                this.changeOnNextUpdate = true;
                this.game.addEntity(new LoadingScreen(this.game, this.game.camera.hero.BB.x, this.game.camera.hero.BB.y));
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
            // show black text on snow biome
            if (this.textIsBlack) {
                ctx.fillStyle = "DarkBlue";
                ctx.strokeStyle = "DarkBlue"; 
            } else {
                ctx.fillStyle = "White";
                ctx.strokeStyle = "White"; 
            }
            
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
            ctx.restore();
        }
         
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    }
}