class Dialogue {
    // isShowingOnCollision will enable the show/hide when the hero is in/outside of given bounding box coords.
    // Note: all x, y, width, height vals are in terms of tiles
    // textCenterX: x position for the middle of text 
    // textCenterY: y position (bottom of text)
    // bbX, bbY, bbWidth, bbHeight: x, y, width, height for bounding box 
    constructor(game, text, isShowingOnCollision, textCenterX, textCenterY, bbX = -100, bbY = -100, bbWidth = 1, bbHeight = 1) {
        Object.assign(this, {game, text, isShowingOnCollision, textCenterX, textCenterY, bbX, bbY, bbWidth, bbHeight});
        this.BB = new BoundingBox(this.bbX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                  this.bbY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                  this.bbWidth * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                  this.bbHeight * PARAMS.BLOCKWIDTH * PARAMS.SCALE);

        this.timeRemaining = 0;
        this.hasTimer = false;
        this.isShowing = false;
    }

    update() {
        if (this.isShowing && this.hasTimer) {
            this.timeRemaining -= this.game.clockTick;
            if (this.timeRemaining <= 0) {
                this.hasTimer = false;
                this.isShowing = false;

            }
        }

        // continue to show while hero is in bounding box 
        if (this.isShowingOnCollision && this.game.camera.hero.hitBB.collide(this.BB)) {
            this.showFor(0.1);
        }

    }

    draw(ctx) {
        if (this.isShowing) {
            ctx.save();
            ctx.font = 28 + 'px "silkscreenbold"';
            ctx.fillStyle = "White";
            ctx.strokeStyle = "White"; 
            ctx.textAlign = "center";
            ctx.fillText(this.text, this.textCenterX * PARAMS.BLOCKWIDTH * PARAMS.SCALE - this.game.camera.x, this.textCenterY * PARAMS.BLOCKWIDTH * PARAMS.SCALE - this.game.camera.y);
            ctx.restore();
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }

    show() {
        this.isShowing = true;
        this.hasTimer = false;
    }


    hide() {
        this.isShowing = false;
        this.hasTimer = false;
    }

    // shows text for given number of seconds
    showFor(numSeconds) {
        this.isShowing = true;
        this.hasTimer = true;
        this.timeRemaining = numSeconds;
    }

}