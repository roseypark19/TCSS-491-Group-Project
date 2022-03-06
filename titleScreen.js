class TitleScreen {
    constructor(game) {
        Object.assign(this, { game});
        this.BB = new BoundingBox(0, 0, 1, 1);
        this.playBB = new BoundingBox(12 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 7.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.howToBB = new BoundingBox(4 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 26 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 9.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 1.7 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.resetBB = new BoundingBox(15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 26 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 4.6 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 1.7 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.creditsBB = new BoundingBox(21 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 26 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 6.1 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 1.7 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.exitBB = new BoundingBox(25 *  PARAMS.BLOCKWIDTH * PARAMS.SCALE, 28 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 4 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 1.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.yesResetBB = new BoundingBox(13 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 20 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 6 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2.6 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
        this.mouseBB = new BoundingBox(0, 0, 1, 1);

        this.showHowTo = false;
        this.showReset = false;
        this.showCredits = false;
    };

    update() {
        if (this.game.click) {
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);   

            // submenu clicks
            if (this.showReset) {
                if (this.mouseBB.collide(this.yesResetBB)) {
                    resetGame();
                    this.showCredits = false;
                    this.showReset = false;
                    this.showHowTo = false;
                } 
            }
            if (!this.showHowTo && !this.showReset && !this.showCredits) {
                // not in submenu
                if (this.mouseBB.collide(this.playBB)) {
                    if (!saveState.firstCutsceneFinished) {
                        saveState.firstCutsceneFinished = true;
                        saveGame(saveState);
                        loadGame();
                        this.game.camera.travelTo(cutSceneScreen);
                    } else {
                        this.game.camera.travelTo(town);
                    }
                } else if (this.mouseBB.collide(this.howToBB)) {
                    this.showHowTo = true;
                } else if (this.mouseBB.collide(this.resetBB)) {
                    this.showReset = true;
                } else if (this.mouseBB.collide(this.creditsBB)) {
                    this.showCredits = true;
                }

            } else {
                // in a submenu there is always an exit button
                if (this.mouseBB.collide(this.exitBB)) {
                    this.showCredits = false;
                    this.showReset = false;
                    this.showHowTo = false;
                }
            }
            
            

            this.game.click = null;
        }

        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        }
    };

    setGreenStroke(ctx) {
        ctx.strokeStyle =  "LightGreen";
        ctx.fillStyle = "LightGreen";
    }

    setGreyStroke(ctx) {
        ctx.strokeStyle =  "LightGrey";
        ctx.fillStyle = "LightGrey";
    }

    draw(ctx) {    
        ctx.save();

        if (!this.showHowTo && !this.showReset && !this.showCredits) {

            this.setGreyStroke(ctx);
            ctx.lineWidth = 12;
            ctx.textAlign = "center";

            // title
            ctx.font = 128 + 'px "silkscreenbold"';
            ctx.fillText("ANIMAL", PARAMS.CANVAS_DIMENSION / 2, 180);
            ctx.fillText("ASSAULT", PARAMS.CANVAS_DIMENSION / 2, 280);

            ctx.textAlign = "left";
            // play
            if (this.mouseBB.collide(this.playBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.font = 64 + 'px "silkscreenbold"';  
            ctx.fillText("PLAY", this.playBB.left + 10, this.playBB.top + 60);
            ctx.strokeRect(this.playBB.left, this.playBB.top, this.playBB.width, this.playBB.height);
            
            this.setGreyStroke(ctx);

            ctx.lineWidth = 8;

            // how to
            if (this.mouseBB.collide(this.howToBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.font = 32 + 'px "silkscreenbold"';  
            ctx.fillText("HOW TO PLAY", this.howToBB.left + 10, this.howToBB.top + 37);
            ctx.strokeRect(this.howToBB.left, this.howToBB.top, this.howToBB.width, this.howToBB.height);

            this.setGreyStroke(ctx);

            // reset 
            if (this.mouseBB.collide(this.resetBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.font = 32 + 'px "silkscreenbold"';  
            ctx.fillText("RESET", this.resetBB.left + 10, this.resetBB.top + 37);
            ctx.strokeRect(this.resetBB.left, this.resetBB.top, this.resetBB.width, this.resetBB.height);
            
            this.setGreyStroke(ctx);

            // credits 
            if (this.mouseBB.collide(this.creditsBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.font = 32 + 'px "silkscreenbold"';  
            ctx.fillText("CREDITS", this.creditsBB.left + 10, this.creditsBB.top + 37);
            ctx.strokeRect(this.creditsBB.left, this.creditsBB.top, this.creditsBB.width, this.creditsBB.height);

        } else {
            this.setGreyStroke(ctx);
            if (this.mouseBB.collide(this.exitBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.lineWidth = 8;
            ctx.font = 32 + 'px "silkscreenbold"';  
            ctx.fillText("EXIT", this.exitBB.left + 15, this.exitBB.top + 35);
            ctx.strokeRect(this.exitBB.left, this.exitBB.top, this.exitBB.width, this.exitBB.height);
        }

        if (this.showHowTo) {
            ctx.textAlign = "center";
            this.setGreyStroke(ctx);
            ctx.font = 86 + 'px "silkscreenbold"';
            ctx.fillText("HOW TO PLAY", PARAMS.CANVAS_DIMENSION / 2, 150);

            ctx.textAlign = "left";

            ctx.font = 36 + 'px "silkscreennormal"';
            ctx.fillText("CONTROLS:", PARAMS.CANVAS_DIMENSION / 20, 300);
            ctx.fillText("- USE WASD OR ARROWS TO MOVE", PARAMS.CANVAS_DIMENSION / 20, 340);
            ctx.fillText("- CLICK(HOLD) THE GAME WINDOW TO ATTACK", PARAMS.CANVAS_DIMENSION / 20, 380);
            ctx.fillText("- USE SPELLS WITH 'Q', 'R', AND 'F'", PARAMS.CANVAS_DIMENSION / 20, 420);
            ctx.fillText("- CHANGE SPELL TYPE WITH 'X'", PARAMS.CANVAS_DIMENSION / 20, 460);
            ctx.fillText("- CHANGE WEAPON TYPE WITH 'C'", PARAMS.CANVAS_DIMENSION / 20, 500);
            ctx.fillText("- SHOW/HIDE INVENTORY WITH 'I'", PARAMS.CANVAS_DIMENSION / 20, 540);

            ctx.fillText("TIPS:", PARAMS.CANVAS_DIMENSION / 20, 620);
            ctx.fillText("- CHECK OUT THE SHOPS AT THE TOWN", PARAMS.CANVAS_DIMENSION / 20, 660);
            ctx.fillText("  TO UPGRADE YOUR CHARACTER!", PARAMS.CANVAS_DIMENSION / 20, 700);
            ctx.fillText("- ELIMINATE ALL ENEMIES TO ", PARAMS.CANVAS_DIMENSION / 20, 740);
            ctx.fillText("  COMPLETE A DUNGEON!", PARAMS.CANVAS_DIMENSION / 20, 780);

        }
        if (this.showReset) {
            ctx.textAlign = "center";
            this.setGreyStroke(ctx);
            ctx.font = 86 + 'px "silkscreenbold"';
            ctx.fillText("RESET", PARAMS.CANVAS_DIMENSION / 2, 150);

            
            ctx.font = 36 + 'px "silkscreennormal"';
            ctx.fillText("ARE YOU SURE YOU WANT TO", PARAMS.CANVAS_DIMENSION / 2, 480);
            ctx.fillText("RESET YOUR GAME?", PARAMS.CANVAS_DIMENSION / 2, 520);


            ctx.textAlign = "left";
            ctx.lineWidth = 10;
            // play
            if (this.mouseBB.collide(this.yesResetBB)) {
                this.setGreenStroke(ctx);
            }
            ctx.font = 64 + 'px "silkscreenbold"';  
            ctx.fillText("YES", this.yesResetBB.left + 10, this.yesResetBB.top + 60);
            ctx.strokeRect(this.yesResetBB.left, this.yesResetBB.top, this.yesResetBB.width, this.yesResetBB.height);

        }
        if (this.showCredits) {
            ctx.textAlign = "center";
            this.setGreyStroke(ctx);
            ctx.font = 86 + 'px "silkscreenbold"';
            ctx.fillText("CREDITS", PARAMS.CANVAS_DIMENSION / 2, 150);

            ctx.font = 36 + 'px "silkscreennormal"';
            ctx.fillText("CREATORS:", PARAMS.CANVAS_DIMENSION / 2, 310);
            ctx.fillText("AUSTN ATTAWAY", PARAMS.CANVAS_DIMENSION / 2, 350);
            ctx.fillText("PARKER ROSENGREEN", PARAMS.CANVAS_DIMENSION / 2, 390);
            ctx.fillText("STEVEN OMEGNA", PARAMS.CANVAS_DIMENSION / 2, 430);


            ctx.fillText("TCSS 491", PARAMS.CANVAS_DIMENSION / 2, 720);
            ctx.fillText("COMPUTATIONAL WORLDS", PARAMS.CANVAS_DIMENSION / 2, 760);
            ctx.fillText("WINTER 2022", PARAMS.CANVAS_DIMENSION / 2, 800);
        }

        ctx.restore();

    };
};