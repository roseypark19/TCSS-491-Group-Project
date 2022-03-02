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
// isACompletePortal value true will mean that when traveled through, the unlocked levels int is incremented and the saveState will be saved
class Portal {
    constructor(game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY, buttonWidth = -1, isACompletePortal = false) {
        Object.assign(this, {game, text, destinationLevel, portalTypeIndex, bbX, bbY, bbWidth, bbHeight, textX, textY, buttonWidth, isACompletePortal});
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

        if (this.isACompletePortal) {
            this.game.addEntity(new GuidingArrow(this.game, this.BB.center.x, this.BB.center.y, true, false));
        }
    }

    update() {
        if (this.changeOnNextUpdate) {
            let travelToSpellScene = false;
            // this IF statement will increment and save
            // the unlocked levels state if it makes sense to do
            if (this.isACompletePortal && isFinalUnlockedDungeon(this.game.camera.currentLevel)) {
                travelToSpellScene = this.game.camera.currentLevel == plains2 
                    || this.game.camera.currentLevel == snow2
                    || this.game.camera.currentLevel == desert2
                    || this.game.camera.currentLevel == swamp2;
                saveState.numLevelsCompleted++;    
            }
            if (this.isACompletePortal) {
                saveState.currency += this.game.camera.hero.currencyCount;
                saveGame(saveState);
                loadGame();
            }
// TODO: TEST THIS BLOCK 
console.log("result: " + travelToSpellScene);
            if (travelToSpellScene) {
                switch (this.game.camera.currentLevel) {
                    case plains2:
                        elementAwardScreen.elementIndex = 0; 
                        break;
                    case desert2: 
                        elementAwardScreen.elementIndex = 1;
                        break;
                    case snow2: 
                        elementAwardScreen.elementIndex = 2;
                        break;
                    case swamp2: 
                        elementAwardScreen.elementIndex = 3;
                        break;   
                }
                this.game.camera.travelTo(elementAwardScreen); 
            } else {
                this.game.camera.travelTo(this.destinationLevel); 
            }


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
};

class GuidingArrow {

    static rotations = [];

    constructor(game, originX, originY, showWhenClose = true, isOverworld = false) {
        Object.assign(this, {game, originX, originY, showWhenClose, isOverworld});
        if (GuidingArrow.rotations.length === 0) {
            for (let i = 0; i < 3; i++) {
                GuidingArrow.rotations.push([]); // three types: overworld, enemy rem, and complete portal
            }
        }
        if (this.isOverworld) {
            this.type = 0; // overworld arrow
        } else {
            if (this.showWhenClose) {
                this.type = 1; // complete arrow
            } else {
                this.type = 2; // enemy rem arrow
            }
        }
        this.x = originX;
        this.y = originY;
        this.oscillateTime = this.type === 0 ? 0.04 : 0.02;
        this.maxAdjust = this.type === 0 ? 10 : 15;
        this.adjust = 0;
        this.counter = 0;
        this.elapsedTimeOscillate = 0;
        this.scale = isOverworld ? PARAMS.SCALE / 4 : PARAMS.SCALE / 2;
        this.theta = 0;
        this.proximityReached = false;

        switch (this.type) {
            case 0:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/overworld_arrow.png");
                break;
            case 1:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/portal_arrow.png");
                break;
            case 2:
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/enemy_arrow.png");
                break;
        }

        this.checkRotation();
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * this.scale, 32 * this.scale);
    };

    update() {

        this.elapsedTimeOscillate += this.game.clockTick;

        if (this.elapsedTimeOscillate >= this.oscillateTime) {
            this.elapsedTimeOscillate = 0;
            this.adjust = oscillate(this.counter, 0, this.maxAdjust) * -1;
            this.counter = (this.counter + 1) % (2 * this.maxAdjust);
        }

        if (this.isOverworld) {
            this.theta = Math.PI / 2;
            this.x = this.originX - 16 * this.scale;
            this.y = this.originY - 60 * this.scale;
            this.y += this.adjust;
            this.proximityReached = true;
        } else {
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Hero) {
                    if (distance(entity.BB.center, {x: this.originX, y: this.originY}) < PARAMS.CANVAS_DIMENSION / 2) { // portal is within vision distance
                        this.x = this.originX - 16 * this.scale;
                        this.y = this.originY - 16 * this.scale - 2.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
                        this.y += this.adjust;
                        this.theta = Math.PI / 2;
                        this.proximityReached = true;
                    } else { // portal not within vision distance
                        let vectorToPortal = { x: this.originX - entity.BB.center.x, y: this.originY - entity.BB.center.y };
                        let portalTheta = Math.atan2(vectorToPortal.y, vectorToPortal.x); // find angle pointing to portal
                        if (portalTheta < 0) {
                            portalTheta += 2 * Math.PI;
                        }
                        this.theta = portalTheta;
                        this.x = entity.BB.center.x + Math.cos(this.theta) * 3 * PARAMS.BLOCKWIDTH * PARAMS.SCALE - 16 * this.scale;
                        this.y = entity.BB.center.y + Math.sin(this.theta) * 3 * PARAMS.BLOCKWIDTH * PARAMS.SCALE - 16 * this.scale;
                        let adjustUnitVector = unitVector(vectorToPortal);
                        this.x += adjustUnitVector.x * this.adjust;
                        this.y += adjustUnitVector.y * this.adjust;
                        this.proximityReached = false;
                    }
                }
            });
        }
        
        this.checkRotation();

        this.updateBB();
    };

    checkRotation() {
        if (!(GuidingArrow.rotations[this.type][this.theta])) {
            GuidingArrow.rotations[this.type][this.theta] = rotateImage(this.spritesheet, 0, 0, 32, 32, this.theta, this.scale);
        }
    };

    draw(ctx) {
        if (!this.proximityReached || (this.proximityReached && this.showWhenClose)) {
            ctx.drawImage(GuidingArrow.rotations[this.type][this.theta], 0, 0, 32 * this.scale, 32 * this.scale, this.x - this.game.camera.x, this.y - this.game.camera.y, 32 * this.scale, 32 * this.scale);
        }
    };
};