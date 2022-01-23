// this.BB is the region that activates the button
// this.buttonBB is the region that can be clicked to transition from level to level

class Portal {
    constructor(game, text, destinationLevel, bbX, bbY, bbWidth, bbHeight, textX, textY) {
        Object.assign(this, {game, text, destinationLevel, bbX, bbY, bbWidth, bbHeight, textX, textY});

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
                                  bbWidth, 
                                  bbHeight);
        this.buttonBB = new BoundingBox(this.buttonX + this.game.camera.x,
                                        this.buttonY + this.game.camera.y,
                                        this.buttonWidth,
                                        this.buttonHeight);
    }

    update() {
        this.showingButton = this.game.camera.hero.hitBB.collide(this.BB);

        this.buttonBB = new BoundingBox(this.buttonX,
            this.buttonY,
            this.buttonWidth,
            this.buttonHeight);

        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y, 1, 1);
        }

        if (this.showingButton && this.game.clicked && this.game.click && this.mouseBB.collide(this.buttonBB)) {
            this.mouseBB = new BoundingBox(0, 0, 1, 1);
            this.game.click = null;
            this.game.camera.travelTo(this.destinationLevel); 
        }
    }

    draw(ctx) {
        if (this.showingButton) {
            ctx.save();
            ctx.font = 48 + 'px "silkscreennormal"';
            ctx.lineWidth = 10;
            // TODO: FIGURE OUT IF SNOW BIOME TO MAKE TEXT BLACK OR SOMETHING
            ctx.fillStyle = "White";
            ctx.strokeStyle = "White"; 
            if (this.mouseBB.collide(this.buttonBB)) {
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