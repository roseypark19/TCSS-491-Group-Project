class StatsShop {
    constructor(game) {
        Object.assign(this, {game});

        this.enteredShop = false;
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
        this.ENTER_TEXT_X = 14.3 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        this.ENTER_TEXT_Y = 39 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        
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
        this.UPGRADE_BOX_X = this.BOX_X + 800;
        this.LEVEL_TEXT_X = this.UPGRADE_BOX_X - 210;
        this.UPGRADE_BOX_WIDTH = 120;
        this.UPGRADE_BOX_HEIGHT = 40;
        this.UPGRADE_BOX_OFFSET_Y = 33;

        // vals for unlock buttons
        this.UNLOCK_X = 680;
        this.UNLOCK_WIDTH = 260;
        this.UNLOCK_HEIGHT = 50;
        this.UNLOCK_OFFSET_Y = 33;
        this.UNLOCK_TEXT_OFFSET_X = 10;

        // costs and levels
        this.MAX_LEVEL = 10;
        this.SPEED_COSTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.HEALTH_COSTS = [3, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.MANA_COSTS = [5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.VITALITY_COSTS = [7, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.WISDOM_COSTS = [9, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.DEFENSE_COSTS = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        this.SPEED_UNLOCK_COST = 999;
        this.HEALTH_UNLOCK_COST = 50;
        this.MANA_UNLOCK_COST = 100;
        this.VITALITY_UNLOCK_COST = 300;
        this.WISDOM_UNLOCK_COST = 666;
        this.DEFENSE_UNLOCK_COST = 999;

        this.speedCost = this.SPEED_COSTS[saveState.heroStats[0]];
        this.healthCost = this.HEALTH_COSTS[saveState.heroStats[1]];
        this.manaCost = this.MANA_COSTS[saveState.heroStats[2]];
        this.vitalityCost = this.VITALITY_COSTS[saveState.heroStats[3]];
        this.wisdomCost = this.WISDOM_COSTS[saveState.heroStats[4]];
        this.defenseCost = this.DEFENSE_COSTS[saveState.heroStats[5]];
    }

    addBBs() {
        this.BB = new BoundingBox(16 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 32 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        this.openShopBB = new BoundingBox(this.ENTER_TEXT_X - this.game.camera.x - 9, this.ENTER_TEXT_Y - this.game.camera.y, 350, 50);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);  
        this.shopMouseBB = new BoundingBox(0, 0, 1, 1);  

        this.speedUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.SPEED_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.healthUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.HEALTH_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.manaUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.MANA_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.vitalityUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.VITALITY_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.wisdomUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.WISDOM_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.defenseUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.DEFENSE_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);

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
        return this.UPGRADE_BOX_X + 4 + (13 * (5 - costStr.length))
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
            
            // exit button
            if (this.shopMouseBB.collide(this.exitBB)) {
                this.enteredShop = false;
            }
            
            // upgrades
            if (this.shopMouseBB.collide(this.speedUpgradeBB) && saveState.currency >= this.speedCost) {
                saveState.currency -= this.speedCost;
                saveState.heroStats[0]++;
                if (saveState.heroStats[0] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
                }
            }
            if (this.shopMouseBB.collide(this.healthUpgradeBB) && saveState.currency >= this.healthCost) {
                saveState.currency -= this.healthCost;
                saveState.heroStats[1]++;
                if (saveState.heroStats[1] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
                }
            }
            if (this.shopMouseBB.collide(this.manaUpgradeBB) && saveState.currency >= this.manaCost) {
                saveState.currency -= this.manaCost;
                saveState.heroStats[2]++;
                if (saveState.heroStats[2] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
                }
            }
            if (this.shopMouseBB.collide(this.vitalityUpgradeBB) && saveState.currency >= this.vitalityCost) {
                saveState.currency -= this.vitalityCost;
                saveState.heroStats[3]++;
                if (saveState.heroStats[3] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
                }
            }
            if (this.shopMouseBB.collide(this.wisdomUpgradeBB) && saveState.currency >= this.wisdomCost) {
                saveState.currency -= this.wisdomCost;
                saveState.heroStats[4]++;
                if (saveState.heroStats[4] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
                }
            }
            if (this.shopMouseBB.collide(this.defenseUpgradeBB) && saveState.currency >= this.defenseCost) {
                saveState.currency -= this.defenseCost;
                saveState.heroStats[5]++;
                if (saveState.heroStats[5] == this.MAX_LEVEL) {
                    this.playMaxUpgradeSound();
                } else {
                    this.playUpgradeSound();
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

        this.speedCost = this.SPEED_COSTS[saveState.heroStats[0]];
        this.healthCost = this.HEALTH_COSTS[saveState.heroStats[1]];
        this.manaCost = this.MANA_COSTS[saveState.heroStats[2]];
        this.vitalityCost = this.VITALITY_COSTS[saveState.heroStats[3]];
        this.wisdomCost = this.WISDOM_COSTS[saveState.heroStats[4]];
        this.defenseCost = this.DEFENSE_COSTS[saveState.heroStats[5]];
        
        let oldLineWidth = ctx.lineWidth;
        let costStr;

        if (this.enteredShop) {
            // whether or not upgrade level is maxxed
            let speedDmgMax = saveState.heroStats[0] == this.MAX_LEVEL;
            let healthDmgMax = saveState.heroStats[1] == this.MAX_LEVEL;
            let manaDmgMax = saveState.heroStats[2] == this.MAX_LEVEL;
            let vitalityDmgMax = saveState.heroStats[3] == this.MAX_LEVEL;
            let wisdomDmgMax = saveState.heroStats[4] == this.MAX_LEVEL;
            let defenseDmgMax = saveState.heroStats[5] == this.MAX_LEVEL;

            // shop is open
            ctx.fillStyle = 'rgba(0, 0, 0, .7)';
            ctx.fillRect(0, 0, PARAMS.CANVAS_DIMENSION, PARAMS.CANVAS_DIMENSION);

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
            
            // SHOP title
            let shopFontSize = 80;
            ctx.font = shopFontSize + 'px "silkscreennormal"';
            ctx.fillText("STATS SHOP", this.SHOP_TEXT_X, this.SHOP_TEXT_Y);

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
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[0]), this.LEVEL_TEXT_X, this.SPEED_BOX_Y + 63)
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.speedUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            costStr = "$" + this.speedCost;
            if (speedDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.speedCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SPEED_BOX_Y + 63)
            ctx.strokeRect(this.UPGRADE_BOX_X, this.SPEED_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
                           
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
            
        // health
            this.setLargeFont(ctx);
            ctx.fillText("HEALTH", this.TEXT_X, this.HEALTH_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("maxHp++ or maxHp += 1", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.HEALTH_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.HEALTH_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
    
            // bought the weapon, so show damage and dexterity upgrade stuff
            
            if (healthDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[1]), this.LEVEL_TEXT_X, this.HEALTH_BOX_Y + 63)
            this.setDefaultFillAndStroke(ctx);
            
            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.healthUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            costStr = "$" + this.healthCost;
            if (healthDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.healthCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.HEALTH_BOX_Y + 63)
            ctx.strokeRect(this.UPGRADE_BOX_X, this.HEALTH_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);

            this.setLargeStroke(ctx);
        
        // mana
            this.setLargeFont(ctx);
            ctx.fillText("MANA", this.TEXT_X, this.MANA_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Deepen the well of magical stuff", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.MANA_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.MANA_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (manaDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[2]), this.LEVEL_TEXT_X, this.MANA_BOX_Y + 63)
            this.setDefaultFillAndStroke(ctx);

            this.setSmallStroke(ctx);
            this.setCostFont(ctx);

            this.setDefaultFillAndStroke(ctx);
            
            if (this.shopMouseBB.collide(this.manaUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            }
            costStr = "$" + this.manaCost;
            if (manaDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.manaCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.MANA_BOX_Y + 63); 
            ctx.strokeRect(this.UPGRADE_BOX_X, this.MANA_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // vitality
            this.setLargeFont(ctx);
            ctx.fillText("VITALITY", this.TEXT_X, this.VITALITY_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Regenerate health faster", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.VITALITY_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.VITALITY_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (vitalityDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[3]), this.LEVEL_TEXT_X, this.VITALITY_BOX_Y + 63)
            
            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.vitalityUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.vitalityCost;
            if (vitalityDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.vitalityCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.VITALITY_BOX_Y + 63);
            ctx.strokeRect(this.UPGRADE_BOX_X, this.VITALITY_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // wisdom
            this.setLargeFont(ctx);
            ctx.fillText("WISDOM", this.TEXT_X, this.WISDOM_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Regenerate mana faster", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.WISDOM_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.WISDOM_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (wisdomDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[4]), this.LEVEL_TEXT_X, this.WISDOM_BOX_Y + 63)

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.wisdomUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.wisdomCost;
            if (wisdomDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.wisdomCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WISDOM_BOX_Y + 63) 
            ctx.strokeRect(this.UPGRADE_BOX_X, this.WISDOM_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
    
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // defense
            this.setLargeFont(ctx);
            ctx.fillText("DEFENSE", this.TEXT_X, this.DEFENSE_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Enemies still hurt you, just less", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.DEFENSE_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.DEFENSE_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            // bought the weapon, so show damage and dexterity upgrade stuff
            if (defenseDmgMax) {
                this.setStrokeAndFillMaxLevel(ctx);
            }
            this.setCostFont(ctx);
            ctx.fillText("Lvl: " + this.formatLevel(saveState.heroStats[5]), this.LEVEL_TEXT_X, this.DEFENSE_BOX_Y + 63)
            this.setDefaultFillAndStroke(ctx);

            this.setDefaultFillAndStroke(ctx);
            this.setSmallStroke(ctx);
            this.setCostFont(ctx);
            
            if (this.shopMouseBB.collide(this.defenseUpgradeBB)) {
                this.setStrokeAndFillGreen(ctx);
            } 
            costStr = "$" + this.defenseCost;
            if (defenseDmgMax) {
                costStr = "MAX!";
                this.setStrokeAndFillMaxLevel(ctx);
            }
            if (saveState.currency < this.defenseCost) {
                this.setStrokeAndFillDark(ctx);
            }
            ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.DEFENSE_BOX_Y + 63) 
            ctx.strokeRect(this.UPGRADE_BOX_X, this.DEFENSE_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
            
            this.setDefaultFillAndStroke(ctx);

            let iconOffset = 10;
            this.speedImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.SPEED_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.healthImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.HEALTH_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.manaImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.MANA_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.vitalityImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.VITALITY_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.wisdomImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.WISDOM_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.defenseImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.DEFENSE_BOX_Y+ iconOffset, PARAMS.SCALE * 2);
            
            this.setDefaultFillAndStroke(ctx);

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
                ctx.strokeRect(this.speedUpgradeBB.x, this.speedUpgradeBB.y, this.speedUpgradeBB.width, this.speedUpgradeBB.height);
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