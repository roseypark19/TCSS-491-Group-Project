class StatsShop {
    constructor(game) {
        Object.assign(this, {game});

        this.enteredShop = true;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/weapon_icons.png");
        
        this.speedImage = new AnimationGroup(this.spritesheet, 24, 0, 12, 12, 1, 1, false, true);
        this.healthImage = new AnimationGroup(this.spritesheet, 48, 0, 12, 12, 1, 1, false, true);
        this.manaImage = new AnimationGroup(this.spritesheet, 60, 0, 12, 12, 1, 1, false, true);
        this.vitalityImage = new AnimationGroup(this.spritesheet, 36, 0, 12, 12, 1, 1, false, true);
        this.wisdomImage = new AnimationGroup(this.spritesheet, 0, 0, 12, 12, 1, 1, false, true);
        this.defenseImage = new AnimationGroup(this.spritesheet, 12, 0, 12, 12, 1, 1, false, true);
                
        this.addConstants();
        this.addBBs();
    };

    addConstants() { 
        this.SHOP_TEXT_X = 24;  // x pos of shop title
        this.SHOP_TEXT_Y = 90; // y pos of shop title

        this.CURRENCY_TEXT_X = 920; // x pos of cash title
        this.CURRENCY_TEXT_Y = 80; // y pos of cash title
        this.CASH_TEXT_WIDTH = 30; // width of cash text font for 1 char
        
        this.TEXT_X = 110;      // x start position of category text
        this.BOX_X = 25;        // x start for category boxes
        this.BOX_WIDTH = 950;   // width of category boxes
        this.BOX_HEIGHT = 120;  // height of category boxes

        this.DESCRIPTION_OFFSET_Y  = 30; // y offset of description text below name text
        this.DESCRIPTION_OFFSET_X  = 5; // x offset of description text below name text
        
        this.TEXT_Y_INITIAL = 180  ; // starting y pos for category text
        this.BOX_Y_INITIAL = 108;  // starting y pos for category text
        this.TEXT_BOX_Y_OFFSET = 135; // y offset for each category box

        // x, y position for open shop button
        this.ENTER_TEXT_X = 201.5 * PARAMS.BLOCKWIDTH;
        this.ENTER_TEXT_Y = 116.5 * PARAMS.BLOCKWIDTH;
        
        // y values for text for each weapon
        this.SPEED_TEXT_Y = this.TEXT_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET);
        this.SPEED_BOX_Y = this.BOX_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET); 
        this.HEALTH_TEXT_Y = this.TEXT_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET);
        this.HEALTH_BOX_Y =  this.BOX_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET); 
        this.MANA_TEXT_Y = this.TEXT_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.MANA_BOX_Y = this.BOX_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.VITALITY_TEXT_Y = this.TEXT_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET);
        this.VITALITY_BOX_Y = this.BOX_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET); 
        this.WISDOM_TEXT_Y = this.TEXT_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET);
        this.WISDOM_BOX_Y = this.BOX_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET); 
        this.DEFENSE_TEXT_Y = this.TEXT_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET);
        this.DEFENSE_BOX_Y = this.BOX_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET); 
        
        // exit button stats
        this.EXIT_BOX_X = 840;
        this.EXIT_BOX_Y = 920;
        this.EXIT_BOX_WIDTH = 130;
        this.EXIT_BOX_HEIGHT = 48; 
        this.EXIT_TEXT_X = this.EXIT_BOX_X + 10;
        this.EXIT_TEXT_Y = this.EXIT_BOX_Y + 36;

        // vals for upgrade buttons
        this.DAMAGE_BOX_X = this.BOX_X + 800;
        this.LEVEL_TEXT_X = this.DAMAGE_BOX_X - 210;
        this.DAMAGE_UPGRADE_BOX_X = this.BOX_X + 810;
        this.DAMAGE_UPGRADE_WIDTH = 120;
        this.DAMAGE_UPGRADE_HEIGHT = 40;
        this.DAMAGE_BOX_OFFSET_Y = 33;
        this.DEXTERITY_BOX_OFFSET_Y = 67;

        // vals for unlock buttons
        this.UNLOCK_X = 680;
        this.UNLOCK_WIDTH = 260;
        this.UNLOCK_HEIGHT = 50;
        this.UNLOCK_OFFSET_Y = 33;
        this.UNLOCK_TEXT_OFFSET_X = 10;

        // costs and levels
        this.MAX_DMG_LEVEL = 10;
        this.MAX_DXT_LEVEL = 10;
        this.SPEED_DMG_COSTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SPEED_DXT_COSTS = [2, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.HEALTH_DMG_COSTS = [3, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.HEALTH_DXT_COSTS = [4, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.MANA_DMG_COSTS = [5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.MANA_DXT_COSTS = [6, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.VITALITY_DMG_COSTS = [7, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.VITALITY_DXT_COSTS = [8, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.WISDOM_DMG_COSTS = [9, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.WISDOM_DXT_COSTS = [10, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.DEFENSE_DMG_COSTS = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.DEFENSE_DXT_COSTS = [12, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        this.SPEED_UNLOCK_COST = 999;
        this.HEALTH_UNLOCK_COST = 50;
        this.MANA_UNLOCK_COST = 100;
        this.VITALITY_UNLOCK_COST = 300;
        this.WISDOM_UNLOCK_COST = 666;
        this.DEFENSE_UNLOCK_COST = 999;

        this.speedDmgCost = this.SPEED_DMG_COSTS[saveState.weapons[0].attack];
        this.speedDxtCost = this.SPEED_DXT_COSTS[saveState.weapons[0].dexterity];
        this.healthDmgCost = this.HEALTH_DMG_COSTS[saveState.weapons[1].attack];
        this.healthDxtCost = this.HEALTH_DXT_COSTS[saveState.weapons[1].dexterity];
        this.manaDmgCost = this.MANA_DMG_COSTS[saveState.weapons[2].attack];
        this.manaDxtCost = this.MANA_DXT_COSTS[saveState.weapons[2].dexterity];
        this.vitalityDmgCost = this.VITALITY_DMG_COSTS[saveState.weapons[3].attack];
        this.vitalityDxtCost = this.VITALITY_DXT_COSTS[saveState.weapons[3].dexterity];
        this.wisdomDmgCost = this.WISDOM_DMG_COSTS[saveState.weapons[4].attack];
        this.wisdomDxtCost = this.WISDOM_DXT_COSTS[saveState.weapons[4].dexterity];
        this.defenseDmgCost = this.DEFENSE_DMG_COSTS[saveState.weapons[5].attack];
        this.defenseDxtCost = this.DEFENSE_DXT_COSTS[saveState.weapons[5].dexterity];
    }

    addBBs() {
        this.BB = new BoundingBox(51 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 32 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        this.openShopBB = new BoundingBox(this.ENTER_TEXT_X - this.game.camera.x - 9, this.ENTER_TEXT_Y - this.game.camera.y, 350, 50);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);  
        this.shopMouseBB = new BoundingBox(0, 0, 1, 1);  

        this.speedDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SPEED_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.speedDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SPEED_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.healthDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.HEALTH_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.healthDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.HEALTH_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.manaDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.MANA_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.manaDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.MANA_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.vitalityDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.VITALITY_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.vitalityDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.VITALITY_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.wisdomDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.WISDOM_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.wisdomDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.WISDOM_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.defenseDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.DEFENSE_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.defenseDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.DEFENSE_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);

        this.speedUnlockBB = new BoundingBox(this.UNLOCK_X, this.SPEED_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.healthUnlockBB = new BoundingBox(this.UNLOCK_X, this.HEALTH_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.manaUnlockBB = new BoundingBox(this.UNLOCK_X, this.MANA_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.vitalityUnlockBB = new BoundingBox(this.UNLOCK_X, this.VITALITY_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.wisdomUnlockBB = new BoundingBox(this.UNLOCK_X, this.WISDOM_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.defenseUnlockBB = new BoundingBox(this.UNLOCK_X, this.DEFENSE_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);

        this.exitBB = new BoundingBox(this.EXIT_BOX_X, this.EXIT_BOX_Y, this.EXIT_BOX_WIDTH, this.EXIT_BOX_HEIGHT);   
    }
 
    setDefaultFillAndStroke(ctx) {
        ctx.fillStyle = "White";
        ctx.strokeStyle = "White";
    }
    setStrokeAndFillGreen(ctx) {
        ctx.strokeStyle = "LightGreen";
        ctx.fillStyle = "LightGreen";
    }
    setStrokeAndFillDark(ctx) {
        ctx.strokeStyle = "DimGrey";
        ctx.fillStyle = "DimGrey";
    }
    setStrokeAndFillMaxLevel(ctx) {
        ctx.strokeStyle = "Orange";
        ctx.fillStyle = "Orange";
    }
    setLargeStroke(ctx) {
        ctx.lineWidth = 8;
    }
    setSmallStroke(ctx) {
        ctx.lineWidth = 5;
    }
    setSmallFont(ctx) {
        ctx.font = 24 + 'px "silkscreennormal"';
    }   
    setMediumFont(ctx) {
        ctx.font = 40 + 'px "silkscreennormal"';
    }
    setLargeFont(ctx) {
        ctx.font = 72 + 'px "silkscreennormal"'; 
    }
    setCostFont(ctx) {
        ctx.font = 30 + 'px "silkscreennormal"';
    }

    // formats and returns the upgrade level text depending on the current 
    // level and the maximum possible level
    formatLevel(currentLevel, maxLevel = 10) {
        return String(currentLevel).padStart(2, '0') + "/" + String(maxLevel).padStart(2, '0');
    }
    
    // returns x pos for upgrade cost
    calcUpgradeCostX(costStr) {
        return this.DAMAGE_BOX_X + 4 + (13 * (5 - costStr.length))
    }

    playUnlockSound() {
        ASSET_MANAGER.playAsset("./audio/CoinUpgrade.wav");
    }
    playUpgradeSound() {
        ASSET_MANAGER.playAsset("./audio/Upgrade.wav");
    }
    playMaxUpgradeSound() {
        ASSET_MANAGER.playAsset("./audio/MaxLevelUpgrade.wav");
    }

    update() {
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y, 1, 1);
            this.shopMouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
        }

        if (this.enteredShop && this.game.clicked && this.game.click) { // updates when user is in shop
            let unlockedSomething = false;
            
            // exit button
            if (this.shopMouseBB.collide(this.exitBB)) {
                console.log("exited")
                this.enteredShop = false;
            }

            // unlocks
            if (!saveState.weapons[0].bought && this.shopMouseBB.collide(this.speedUnlockBB) && saveState.currency >= this.SPEED_UNLOCK_COST) {
                saveState.weapons[0].bought = true;
                saveState.currency -= this.SPEED_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[1].bought && this.shopMouseBB.collide(this.healthUnlockBB) && saveState.currency >= this.HEALTH_UNLOCK_COST) {
                saveState.weapons[1].bought = true;
                saveState.currency -= this.HEALTH_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[2].bought && this.shopMouseBB.collide(this.manaUnlockBB) && saveState.currency >= this.MANA_UNLOCK_COST) {
                saveState.weapons[2].bought = true;
                saveState.currency -= this.MANA_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[3].bought && this.shopMouseBB.collide(this.vitalityUnlockBB) && saveState.currency >= this.VITALITY_UNLOCK_COST) {
                saveState.weapons[3].bought = true;
                saveState.currency -= this.VITALITY_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[4].bought && this.shopMouseBB.collide(this.wisdomUnlockBB) && saveState.currency >= this.WISDOM_UNLOCK_COST) {
                saveState.weapons[4].bought = true;
                saveState.currency -= this.WISDOM_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[5].bought && this.shopMouseBB.collide(this.defenseUnlockBB) && saveState.currency >= this.DEFENSE_UNLOCK_COST) {
                saveState.weapons[5].bought = true;
                saveState.currency -= this.DEFENSE_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }

            if (!unlockedSomething) {
                // damage upgrades
                if (this.shopMouseBB.collide(this.speedDmgUpgradeBB) && saveState.currency >= this.speedDmgCost) {
                    saveState.currency -= this.speedDmgCost;
                    saveState.weapons[0].attack++;
                    if (saveState.weapons[0].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.healthDmgUpgradeBB) && saveState.currency >= this.healthDmgCost) {
                    saveState.currency -= this.healthDmgCost;
                    saveState.weapons[1].attack++;
                    if (saveState.weapons[1].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.manaDmgUpgradeBB) && saveState.currency >= this.manaDmgCost) {
                    saveState.currency -= this.manaDmgCost;
                    saveState.weapons[2].attack++;
                    if (saveState.weapons[2].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.vitalityDmgUpgradeBB) && saveState.currency >= this.vitalityDmgCost) {
                    saveState.currency -= this.vitalityDmgCost;
                    saveState.weapons[3].attack++;
                    if (saveState.weapons[3].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.wisdomDmgUpgradeBB) && saveState.currency >= this.wisdomDmgCost) {
                    saveState.currency -= this.wisdomDmgCost;
                    saveState.weapons[4].attack++;
                    if (saveState.weapons[4].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.defenseDmgUpgradeBB) && saveState.currency >= this.defenseDmgCost) {
                    saveState.currency -= this.defenseDmgCost;
                    saveState.weapons[5].attack++;
                    if (saveState.weapons[5].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }

                // dexterity upgrades
                if (this.shopMouseBB.collide(this.speedDxtUpgradeBB) && saveState.currency >= this.speedDxtCost) {
                    saveState.currency -= this.speedDxtCost;
                    saveState.weapons[0].dexterity++;
                    if (saveState.weapons[0].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.healthDxtUpgradeBB) && saveState.currency >= this.healthDxtCost) {
                    saveState.currency -= this.healthDxtCost;
                    saveState.weapons[1].dexterity++;
                    if (saveState.weapons[1].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.manaDxtUpgradeBB) && saveState.currency >= this.manaDxtCost) {
                    saveState.currency -= this.manaDxtCost;
                    saveState.weapons[2].dexterity++;
                    if (saveState.weapons[2].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.vitalityDxtUpgradeBB) && saveState.currency >= this.vitalityDxtCost) {
                    saveState.currency -= this.vitalityDxtCost;
                    saveState.weapons[3].dexterity++;
                    if (saveState.weapons[3].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.wisdomDxtUpgradeBB) && saveState.currency >= this.wisdomDxtCost) {
                    saveState.currency -= this.wisdomDxtCost;
                    saveState.weapons[4].dexterity++;
                    if (saveState.weapons[4].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.defenseDxtUpgradeBB) && saveState.currency >= this.defenseDxtCost) {
                    saveState.currency -= this.defenseDxtCost;
                    saveState.weapons[5].dexterity++;
                    if (saveState.weapons[5].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
            }
            

            this.game.click = null;

        } else { // updates when user is not in shop
            if (this.BB.collide(this.game.camera.hero.BB) &&
                    this.game.clicked && this.openShopBB.collide(this.mouseBB)) {
                    this.enteredShop = true;
            }
        }     
    };

    draw(ctx) {

        this.speedDmgCost = this.SPEED_DMG_COSTS[saveState.weapons[0].attack];
        this.healthDmgCost = this.HEALTH_DMG_COSTS[saveState.weapons[1].attack];
        this.manaDmgCost = this.MANA_DMG_COSTS[saveState.weapons[2].attack];
        this.vitalityDmgCost = this.VITALITY_DMG_COSTS[saveState.weapons[3].attack];
        this.wisdomDmgCost = this.WISDOM_DMG_COSTS[saveState.weapons[4].attack];
        this.defenseDmgCost = this.DEFENSE_DMG_COSTS[saveState.weapons[5].attack];
        
        let oldLineWidth = ctx.lineWidth;
        let costStr;

        if (this.enteredShop) {
            // whether or not upgrade level is maxxed
            let speedDmgMax = saveState.weapons[0].attack == this.MAX_DMG_LEVEL;
            let healthDmgMax = saveState.weapons[1].attack == this.MAX_DMG_LEVEL;
            let manaDmgMax = saveState.weapons[2].attack == this.MAX_DMG_LEVEL;
            let vitalityDmgMax = saveState.weapons[3].attack == this.MAX_DMG_LEVEL;
            let wisdomDmgMax = saveState.weapons[4].attack == this.MAX_DMG_LEVEL;
            let defenseDmgMax = saveState.weapons[5].attack == this.MAX_DMG_LEVEL;

            // shop is open
            ctx.fillStyle = 'rgba(0, 0, 0, .7)';
            ctx.fillRect(0, 0, PARAMS.CANVAS_DIMENSION, PARAMS.CANVAS_DIMENSION);

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
            
            // SHOP title
            let shopFontSize = 80;
            ctx.font = shopFontSize + 'px "silkscreennormal"';
            ctx.fillText("WEAPONS SHOP", this.SHOP_TEXT_X, this.SHOP_TEXT_Y);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);

            // exit
            if (this.shopMouseBB.collide(this.exitBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            ctx.font = 38 + 'px "silkscreenbold"';  
            ctx.fillText("EXIT", this.EXIT_TEXT_X, this.EXIT_TEXT_Y);
            ctx.strokeRect(this.EXIT_BOX_X, this.EXIT_BOX_Y, this.EXIT_BOX_WIDTH, this.EXIT_BOX_HEIGHT);

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

            // currency
            this.cashOffset = (("" + saveState.currency).length - 1) * this.CASH_TEXT_WIDTH;
            this.cashTextX = this.CURRENCY_TEXT_X - this.cashOffset;
            this.setMediumFont(ctx);
            ctx.fillText("$" + saveState.currency, this.cashTextX, this.CURRENCY_TEXT_Y);
            





        // speed
            this.setLargeFont(ctx);
            ctx.fillText("SPEED", this.TEXT_X, this.SPEED_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("So you can run away faster", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.SPEED_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            
            // bought the weapon, so show damage and dexterity upgrade stuff
            if (speedDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            // ctx.fillText("Damage", this.LEVEL_TEXT_X, this.SPEED_BOX_Y + 30);            
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[0].attack), this.LEVEL_TEXT_X, this.SPEED_BOX_Y + 63)
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.speedDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            costStr = "$" + this.speedDmgCost;
            if (speedDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.speedDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SPEED_BOX_Y + 63)
            ctx.strokeRect(this.DAMAGE_BOX_X, this.SPEED_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);
        
            // ctx.strokeRect(this.DAMAGE_BOX_X, this.SPEED_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            this.setDefaultFillAndStroke(ctx);

               
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
            
        // health
            if (!saveState.weapons[1].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("HEALTH", this.TEXT_X, this.HEALTH_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("maxHp++ or maxHp += 1", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.HEALTH_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.HEALTH_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
    
            // bought the weapon, so show damage and dexterity upgrade stuff
            if (healthDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            ctx.fillText("Damage", this.LEVEL_TEXT_X, this.HEALTH_BOX_Y + 30);            
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[1].attack), this.LEVEL_TEXT_X, this.HEALTH_BOX_Y + 53)
            this.setDefaultFillAndStroke(ctx);
            
            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.healthDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.healthDmgCost;
            if (healthDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.healthDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.HEALTH_BOX_Y + 41)
            ctx.strokeRect(this.DAMAGE_BOX_X, this.HEALTH_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);

            this.setLargeStroke(ctx);
        




        // mana
            if (!saveState.weapons[2].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("MANA", this.TEXT_X, this.MANA_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Deepen the well of magical stuff", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.MANA_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.MANA_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (manaDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            ctx.fillText("Damage", this.LEVEL_TEXT_X, this.MANA_BOX_Y + 30);            
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[2].attack), this.LEVEL_TEXT_X, this.MANA_BOX_Y + 53)
            this.setDefaultFillAndStroke(ctx);

            this.setSmallStroke(ctx);
            this.setCostFont(ctx);

            this.setDefaultFillAndStroke(ctx);
            
            if (this.shopMouseBB.collide(this.manaDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            costStr = "$" + this.manaDmgCost;
            if (manaDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.manaDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.MANA_BOX_Y + 41) 
            ctx.strokeRect(this.DAMAGE_BOX_X, this.MANA_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);







        // vitality
            if (!saveState.weapons[3].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("VITALITY", this.TEXT_X, this.VITALITY_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Regenerate health faster", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.VITALITY_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.VITALITY_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (vitalityDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            ctx.fillText("Damage", this.LEVEL_TEXT_X, this.VITALITY_BOX_Y + 30);            
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[3].attack), this.LEVEL_TEXT_X, this.VITALITY_BOX_Y + 53)
            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.vitalityDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.vitalityDmgCost;
            if (vitalityDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.vitalityDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.VITALITY_BOX_Y + 41) 
            ctx.strokeRect(this.DAMAGE_BOX_X, this.VITALITY_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);




        // wisdom
            if (!saveState.weapons[4].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("WISDOM", this.TEXT_X, this.WISDOM_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Regenerate mana faster", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.WISDOM_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.WISDOM_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (wisdomDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            ctx.fillText("Damage", this.LEVEL_TEXT_X, this.WISDOM_BOX_Y + 30);            
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].attack), this.LEVEL_TEXT_X, this.WISDOM_BOX_Y + 53)
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.wisdomDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.wisdomDmgCost;
            if (wisdomDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.wisdomDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WISDOM_BOX_Y + 41) 
            ctx.strokeRect(this.DAMAGE_BOX_X, this.WISDOM_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
    
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);




        // defense
            if (!saveState.weapons[5].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("DEFENSE", this.TEXT_X, this.DEFENSE_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Enemies still hurt you, just less", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.DEFENSE_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.DEFENSE_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (defenseDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            ctx.fillText("Damage", this.LEVEL_TEXT_X, this.DEFENSE_BOX_Y + 30);            
            ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[5].attack), this.LEVEL_TEXT_X, this.DEFENSE_BOX_Y + 53)
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.defenseDmgUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.defenseDmgCost;
            if (defenseDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.defenseDmgCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.DEFENSE_BOX_Y + 41) 
            ctx.strokeRect(this.DAMAGE_BOX_X, this.DEFENSE_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);



            let iconOffset = 10;
            this.speedImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.SPEED_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.healthImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.HEALTH_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.manaImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.MANA_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.vitalityImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.VITALITY_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.wisdomImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.WISDOM_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.defenseImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.DEFENSE_BOX_Y+ iconOffset, PARAMS.SCALE * 2);
            
            this.setDefaultFillAndStroke(ctx);

// ctx.fillText("Damage increases attack damage", 20, 930);
// ctx.fillText("Dexterity increases attack speed", 20, 955);

        } else {
            // shop is closed
            // hero close enough to show 
            if (this.BB.collide(this.game.camera.hero.BB)) {
                this.setDefaultFillAndStroke(ctx);
                this.setMediumFont(ctx);
                ctx.font = 48 + 'px "silkscreennormal"';
                ctx.lineWidth = 10;
                ctx.fillStyle = 'rgba(0, 0, 0, .5)';
                ctx.fillRect(this.ENTER_TEXT_X - this.game.camera.x - 9, this.ENTER_TEXT_Y - this.game.camera.y, 350, 50);
            
                if (this.openShopBB.collide(this.mouseBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } else {
                    ctx.fillStyle = 'White'
                }
                ctx.strokeRect(this.ENTER_TEXT_X - this.game.camera.x - 9, this.ENTER_TEXT_Y - this.game.camera.y, 350, 50);
                ctx.fillText("ENTER SHOP", this.ENTER_TEXT_X - this.game.camera.x, this.ENTER_TEXT_Y + 40 - this.game.camera.y);
            }
        }
                   
        ctx.lineWidth = oldLineWidth;

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            if (this.enteredShop) {
                // note: only includes boxes for speed
                ctx.strokeRect(this.speedDmgUpgradeBB.x, this.speedDmgUpgradeBB.y, this.speedDmgUpgradeBB.width, this.speedDmgUpgradeBB.height);
                ctx.strokeRect(this.speedDxtUpgradeBB.x, this.speedDxtUpgradeBB.y, this.speedDxtUpgradeBB.width, this.speedDxtUpgradeBB.height);
                ctx.strokeRect(this.speedUnlockBB.x, this.speedUnlockBB.y, this.speedUnlockBB.width, this.speedUnlockBB.height);
         
            } else {
                console.log(this.openShopBB)
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.openShopBB.x - this.game.camera.x, this.openShopBB.y - this.game.camera.y, this.openShopBB.width, this.openShopBB.height);
            }
           
        }

    };
};