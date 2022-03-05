


// elementIndex: 0: wind, 1: fire, 2: ice, 3: earth 
class ElementAwardScreen {
    constructor(game, elementIndex) {
        Object.assign(this, { game, elementIndex });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero/spells.png");
        this.animation = new AnimationGroup(this.spritesheet, 96 * this.elementIndex, 0, 96, 32, 1, 0.06, false, true);

        this.BB = new BoundingBox(0, 0, 1, 1);
        this.playBB = new BoundingBox(6 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 24 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 19.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);   

        this.elementName = ["WIND", "FIRE", "ICE", "EARTH"][elementIndex];
        this.elementDesc = [
            "WIND SPELLS CONFUSE ENEMIES!",
            "FIRE SPELLS INJURES ENEMIES OVER TIME",
            "ICE SPELLS FREEZE ENEMIES", 
            "EARTH SPELLS SLOW ENEMIES"
        ][elementIndex];
        this.game.click = null;

    } 

    update() {
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        }

        if (this.game.click) {
            if (this.mouseBB.collide(this.playBB)) {
                saveState.numSpellsUnlocked++;
                saveGame(saveState);
                loadGame();
                this.game.camera.travelTo(overworld);
            }
            this.game.click = null; 
        }

    }

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_DIMENSION / 4, PARAMS.CANVAS_DIMENSION * 0.55, 5);

        ctx.textAlign = "center";
        ctx.fillStyle = "lightgrey";
        ctx.font = 75 + 'px "silkscreenbold"';
        ctx.fillText("CONGRATS!", PARAMS.CANVAS_DIMENSION / 2, 180);
        ctx.font = 48 + 'px "silkscreenbold"';
        ctx.fillText("YOU HAVE UNLOCKED THE", PARAMS.CANVAS_DIMENSION / 2, 270);
        ctx.fillText(this.elementName + " SPELL TYPE", PARAMS.CANVAS_DIMENSION / 2, 320);

        ctx.font = 32 + 'px "silkscreenbold"';
        ctx.fillText(this.elementDesc, PARAMS.CANVAS_DIMENSION / 2, 500);
        

        ctx.strokeStyle = "LightGrey";
        ctx.lineWidth = 12;

        ctx.textAlign = "left";
        // play
        if (this.mouseBB.collide(this.playBB)) {
            ctx.strokeStyle = "LightGreen";
            ctx.fillStyle = "lightgreen";
        }
        ctx.font = 48 + 'px "silkscreenbold"';  
        ctx.fillText("ENTER OVERWORLD", this.playBB.left + 10, this.playBB.top + 53);
        ctx.strokeRect(this.playBB.left, this.playBB.top, this.playBB.width, this.playBB.height);
            
    }

}