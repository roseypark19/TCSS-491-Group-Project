class WeaponsShop {
    constructor(game) {
        Object.assign(this, {game});

        this.enteredShop = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/weapon_icons.png");
        
        this.swordImage = new AnimationGroup(this.spritesheet, 24, 0, 12, 12, 1, 1, false, true);
        this.axeImage = new AnimationGroup(this.spritesheet, 48, 0, 12, 12, 1, 1, false, true);
        this.whipImage = new AnimationGroup(this.spritesheet, 60, 0, 12, 12, 1, 1, false, true);
        this.flailImage = new AnimationGroup(this.spritesheet, 36, 0, 12, 12, 1, 1, false, true);
        this.slingshotImage = new AnimationGroup(this.spritesheet, 0, 0, 12, 12, 1, 1, false, true);
        this.bowImage = new AnimationGroup(this.spritesheet, 12, 0, 12, 12, 1, 1, false, true);
                
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
        this.ENTER_TEXT_X = 50.3 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        this.ENTER_TEXT_Y = 29.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        
        // y values for text for each weapon
        this.SWORD_TEXT_Y = this.TEXT_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET);
        this.SWORD_BOX_Y = this.BOX_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET); 
        this.AXE_TEXT_Y = this.TEXT_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET);
        this.AXE_BOX_Y =  this.BOX_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET); 
        this.WHIP_TEXT_Y = this.TEXT_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.WHIP_BOX_Y = this.BOX_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.FLAIL_TEXT_Y = this.TEXT_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET);
        this.FLAIL_BOX_Y = this.BOX_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET); 
        this.SLINGSHOT_TEXT_Y = this.TEXT_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET);
        this.SLINGSHOT_BOX_Y = this.BOX_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET); 
        this.BOW_TEXT_Y = this.TEXT_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET);
        this.BOW_BOX_Y = this.BOX_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET); 
        
        // exit button stats
        this.EXIT_BOX_X = 840;
        this.EXIT_BOX_Y = 920;
        this.EXIT_BOX_WIDTH = 130;
        this.EXIT_BOX_HEIGHT = 48; 
        this.EXIT_TEXT_X = this.EXIT_BOX_X + 10;
        this.EXIT_TEXT_Y = this.EXIT_BOX_Y + 36;

        // vals for upgrade buttons
        this.DAMAGE_BOX_X = this.BOX_X + 810;
        this.DAMAGE_TEXT_X = this.DAMAGE_BOX_X - 170;
        this.DAMAGE_UPGRADE_BOX_X = this.BOX_X + 810;
        this.DAMAGE_UPGRADE_WIDTH = 120;
        this.DAMAGE_UPGRADE_HEIGHT = 40;
        this.DAMAGE_BOX_OFFSET_Y = 12;
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
        this.SWORD_DMG_COSTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SWORD_DXT_COSTS = [2, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.AXE_DMG_COSTS = [3, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.AXE_DXT_COSTS = [4, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.WHIP_DMG_COSTS = [5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.WHIP_DXT_COSTS = [6, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.FLAIL_DMG_COSTS = [7, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.FLAIL_DXT_COSTS = [8, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SLINGSHOT_DMG_COSTS = [9, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SLINGSHOT_DXT_COSTS = [10, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.BOW_DMG_COSTS = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.BOW_DXT_COSTS = [12, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        this.SWORD_UNLOCK_COST = 999;
        this.AXE_UNLOCK_COST = 50;
        this.WHIP_UNLOCK_COST = 100;
        this.FLAIL_UNLOCK_COST = 300;
        this.SLINGSHOT_UNLOCK_COST = 666;
        this.BOW_UNLOCK_COST = 999;

        this.swordDmgCost = this.SWORD_DMG_COSTS[saveState.weapons[0].attack];
        this.swordDxtCost = this.SWORD_DXT_COSTS[saveState.weapons[0].dexterity];
        this.axeDmgCost = this.AXE_DMG_COSTS[saveState.weapons[1].attack];
        this.axeDxtCost = this.AXE_DXT_COSTS[saveState.weapons[1].dexterity];
        this.whipDmgCost = this.WHIP_DMG_COSTS[saveState.weapons[2].attack];
        this.whipDxtCost = this.WHIP_DXT_COSTS[saveState.weapons[2].dexterity];
        this.flailDmgCost = this.FLAIL_DMG_COSTS[saveState.weapons[3].attack];
        this.flailDxtCost = this.FLAIL_DXT_COSTS[saveState.weapons[3].dexterity];
        this.slingshotDmgCost = this.SLINGSHOT_DMG_COSTS[saveState.weapons[4].attack];
        this.slingshotDxtCost = this.SLINGSHOT_DXT_COSTS[saveState.weapons[4].dexterity];
        this.bowDmgCost = this.BOW_DMG_COSTS[saveState.weapons[5].attack];
        this.bowDxtCost = this.BOW_DXT_COSTS[saveState.weapons[5].dexterity];
    }

    addBBs() {
        this.BB = new BoundingBox(51 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 27 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 32 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        this.openShopBB = new BoundingBox(this.ENTER_TEXT_X, this.ENTER_TEXT_Y, 350, 50);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);  
        this.shopMouseBB = new BoundingBox(0, 0, 1, 1);  

        this.swordDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.swordDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.axeDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.axeDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.whipDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.whipDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.flailDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.flailDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.slingshotDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.slingshotDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.bowDmgUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
        this.bowDxtUpgradeBB = new BoundingBox(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);

        this.swordUnlockBB = new BoundingBox(this.UNLOCK_X, this.SWORD_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.axeUnlockBB = new BoundingBox(this.UNLOCK_X, this.AXE_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.whipUnlockBB = new BoundingBox(this.UNLOCK_X, this.WHIP_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.flailUnlockBB = new BoundingBox(this.UNLOCK_X, this.FLAIL_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.slingshotUnlockBB = new BoundingBox(this.UNLOCK_X, this.SLINGSHOT_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
        this.bowUnlockBB = new BoundingBox(this.UNLOCK_X, this.BOW_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);

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
                this.enteredShop = false;
            }

            // unlocks
            if (!saveState.weapons[0].bought && this.shopMouseBB.collide(this.swordUnlockBB) && saveState.currency >= this.SWORD_UNLOCK_COST) {
                saveState.weapons[0].bought = true;
                saveState.currency -= this.SWORD_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[1].bought && this.shopMouseBB.collide(this.axeUnlockBB) && saveState.currency >= this.AXE_UNLOCK_COST) {
                saveState.weapons[1].bought = true;
                saveState.currency -= this.AXE_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[2].bought && this.shopMouseBB.collide(this.whipUnlockBB) && saveState.currency >= this.WHIP_UNLOCK_COST) {
                saveState.weapons[2].bought = true;
                saveState.currency -= this.WHIP_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[3].bought && this.shopMouseBB.collide(this.flailUnlockBB) && saveState.currency >= this.FLAIL_UNLOCK_COST) {
                saveState.weapons[3].bought = true;
                saveState.currency -= this.FLAIL_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[4].bought && this.shopMouseBB.collide(this.slingshotUnlockBB) && saveState.currency >= this.SLINGSHOT_UNLOCK_COST) {
                saveState.weapons[4].bought = true;
                saveState.currency -= this.SLINGSHOT_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }
            if (!saveState.weapons[5].bought && this.shopMouseBB.collide(this.bowUnlockBB) && saveState.currency >= this.BOW_UNLOCK_COST) {
                saveState.weapons[5].bought = true;
                saveState.currency -= this.BOW_UNLOCK_COST;
                unlockedSomething = true;
                this.playUnlockSound();
            }

            if (!unlockedSomething) {
                // damage upgrades
                if (this.shopMouseBB.collide(this.swordDmgUpgradeBB) && saveState.weapons[0].bought && saveState.currency >= this.swordDmgCost) {
                    saveState.currency -= this.swordDmgCost;
                    saveState.weapons[0].attack++;
                    if (saveState.weapons[0].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.axeDmgUpgradeBB) && saveState.weapons[1].bought && saveState.currency >= this.axeDmgCost) {
                    saveState.currency -= this.axeDmgCost;
                    saveState.weapons[1].attack++;
                    if (saveState.weapons[1].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.whipDmgUpgradeBB) && saveState.weapons[2].bought  && saveState.currency >= this.whipDmgCost) {
                    saveState.currency -= this.whipDmgCost;
                    saveState.weapons[2].attack++;
                    if (saveState.weapons[2].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.flailDmgUpgradeBB) && saveState.weapons[3].bought  && saveState.currency >= this.flailDmgCost) {
                    saveState.currency -= this.flailDmgCost;
                    saveState.weapons[3].attack++;
                    if (saveState.weapons[3].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.slingshotDmgUpgradeBB) && saveState.weapons[4].bought  && saveState.currency >= this.slingshotDmgCost) {
                    saveState.currency -= this.slingshotDmgCost;
                    saveState.weapons[4].attack++;
                    if (saveState.weapons[4].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.bowDmgUpgradeBB) && saveState.weapons[5].bought && saveState.currency >= this.bowDmgCost) {
                    saveState.currency -= this.bowDmgCost;
                    saveState.weapons[5].attack++;
                    if (saveState.weapons[5].attack == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }

                // dexterity upgrades
                if (this.shopMouseBB.collide(this.swordDxtUpgradeBB) && saveState.weapons[0].bought && saveState.currency >= this.swordDxtCost) {
                    saveState.currency -= this.swordDxtCost;
                    saveState.weapons[0].dexterity++;
                    if (saveState.weapons[0].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.axeDxtUpgradeBB) && saveState.weapons[1].bought && saveState.currency >= this.axeDxtCost) {
                    saveState.currency -= this.axeDxtCost;
                    saveState.weapons[1].dexterity++;
                    if (saveState.weapons[1].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.whipDxtUpgradeBB) && saveState.weapons[2].bought && saveState.currency >= this.whipDxtCost) {
                    saveState.currency -= this.whipDxtCost;
                    saveState.weapons[2].dexterity++;
                    if (saveState.weapons[2].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.flailDxtUpgradeBB) && saveState.weapons[3].bought && saveState.currency >= this.flailDxtCost) {
                    saveState.currency -= this.flailDxtCost;
                    saveState.weapons[3].dexterity++;
                    if (saveState.weapons[3].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.slingshotDxtUpgradeBB) && saveState.weapons[4].bought && saveState.currency >= this.slingshotDxtCost) {
                    saveState.currency -= this.slingshotDxtCost;
                    saveState.weapons[4].dexterity++;
                    if (saveState.weapons[4].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
                if (this.shopMouseBB.collide(this.bowDxtUpgradeBB) && saveState.weapons[5].bought && saveState.currency >= this.bowDxtCost) {
                    saveState.currency -= this.bowDxtCost;
                    saveState.weapons[5].dexterity++;
                    if (saveState.weapons[5].dexterity == this.MAX_DMG_LEVEL) {
                        this.playMaxUpgradeSound();
                    } else {
                        this.playUpgradeSound();
                    }
                }
            } 
            
            // save game to ensure if something was bought it is saved
            saveGame(saveState);
            
            this.game.click = null;

        } else { // updates when user is not in shop
            if (this.BB.collide(this.game.camera.hero.BB) &&
                    this.game.clicked && this.openShopBB.collide(this.mouseBB)) {
                    this.enteredShop = true;
                    this.game.click = null;
            }
        }     
    };

    draw(ctx) {

        this.swordDmgCost = this.SWORD_DMG_COSTS[saveState.weapons[0].attack];
        this.swordDxtCost = this.SWORD_DXT_COSTS[saveState.weapons[0].dexterity];
        this.axeDmgCost = this.AXE_DMG_COSTS[saveState.weapons[1].attack];
        this.axeDxtCost = this.AXE_DXT_COSTS[saveState.weapons[1].dexterity];
        this.whipDmgCost = this.WHIP_DMG_COSTS[saveState.weapons[2].attack];
        this.whipDxtCost = this.WHIP_DXT_COSTS[saveState.weapons[2].dexterity];
        this.flailDmgCost = this.FLAIL_DMG_COSTS[saveState.weapons[3].attack];
        this.flailDxtCost = this.FLAIL_DXT_COSTS[saveState.weapons[3].dexterity];
        this.slingshotDmgCost = this.SLINGSHOT_DMG_COSTS[saveState.weapons[4].attack];
        this.slingshotDxtCost = this.SLINGSHOT_DXT_COSTS[saveState.weapons[4].dexterity];
        this.bowDmgCost = this.BOW_DMG_COSTS[saveState.weapons[5].attack];
        this.bowDxtCost = this.BOW_DXT_COSTS[saveState.weapons[5].dexterity];
        
        let oldLineWidth = ctx.lineWidth;
        let costStr;

        if (this.enteredShop) {
            // whether or not upgrade level is maxxed
            let swordDmgMax = saveState.weapons[0].attack == this.MAX_DMG_LEVEL;
            let swordDxtMax = saveState.weapons[0].dexterity == this.MAX_DMG_LEVEL;
            let axeDmgMax = saveState.weapons[1].attack == this.MAX_DMG_LEVEL;
            let axeDxtMax = saveState.weapons[1].dexterity == this.MAX_DMG_LEVEL;
            let whipDmgMax = saveState.weapons[2].attack == this.MAX_DMG_LEVEL;
            let whipDxtMax = saveState.weapons[2].dexterity == this.MAX_DMG_LEVEL;
            let flailDmgMax = saveState.weapons[3].attack == this.MAX_DMG_LEVEL;
            let flailDxtMax = saveState.weapons[3].dexterity == this.MAX_DMG_LEVEL;
            let slingshotDmgMax = saveState.weapons[4].attack == this.MAX_DMG_LEVEL;
            let slingshotDxtMax = saveState.weapons[4].dexterity == this.MAX_DMG_LEVEL;
            let bowDmgMax = saveState.weapons[5].attack == this.MAX_DMG_LEVEL;
            let bowDxtMax = saveState.weapons[5].dexterity == this.MAX_DMG_LEVEL;

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
            // ctx.fillText(saveState.currency, this.CURRENCY_TEXT_X, this.CURRENCY_TEXT_Y);
            
        // sword
            if (!saveState.weapons[0].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("SWORD", this.TEXT_X, this.SWORD_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("It's what you get when you start", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.SWORD_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.SWORD_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

            if (saveState.weapons[0].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (swordDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[0].attack), this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (swordDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[0].dexterity), this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 108)
    
                this.setDefaultFillAndStroke(ctx);
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.swordDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                costStr = "$" + this.swordDmgCost;
                if (swordDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.swordDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SWORD_BOX_Y + 41)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.swordDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.swordDxtCost;
                if (swordDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.swordDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SWORD_BOX_Y + 96)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);
            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.swordUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.SWORD_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.SWORD_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.SWORD_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.SWORD_TEXT_Y);

            }
               
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
            
        // axe
            if (!saveState.weapons[1].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("AXE", this.TEXT_X, this.AXE_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("It's an axe... so yeah", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.AXE_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.AXE_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            if (saveState.weapons[1].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (axeDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[1].attack), this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (axeDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[1].dexterity), this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 108)
                
                this.setDefaultFillAndStroke(ctx);
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.axeDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.axeDmgCost;
                if (axeDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.axeDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.AXE_BOX_Y + 41)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.axeDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                costStr = "$" + this.axeDxtCost
                if (axeDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.axeDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.AXE_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.axeUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.AXE_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.AXE_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.AXE_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.AXE_TEXT_Y);
            }

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);
        
        // whip
            if (!saveState.weapons[2].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("WHIP", this.TEXT_X, this.WHIP_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Embrace your inner cowboy", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.WHIP_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.WHIP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            if (saveState.weapons[2].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (whipDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[2].attack), this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (whipDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[2].dexterity), this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);

                this.setDefaultFillAndStroke(ctx);
                
                if (this.shopMouseBB.collide(this.whipDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                costStr = "$" + this.whipDmgCost;
                if (whipDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.whipDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WHIP_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.whipDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.whipDxtCost;
                if (whipDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.whipDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WHIP_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.whipUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.WHIP_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.WHIP_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.WHIP_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.WHIP_TEXT_Y);
            }

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // flail
            if (!saveState.weapons[3].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("FLAIL", this.TEXT_X, this.FLAIL_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("A ball and a handle and a rope", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.FLAIL_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.FLAIL_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            if (saveState.weapons[3].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (flailDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[3].attack), this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (flailDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[3].dexterity), this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 108)
    
                this.setDefaultFillAndStroke(ctx);
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.flailDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.flailDmgCost;
                if (flailDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.flailDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.FLAIL_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.flailDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.flailDxtCost;
                if (flailDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.flailDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.FLAIL_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.flailUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.FLAIL_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.FLAIL_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.FLAIL_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.FLAIL_TEXT_Y);
            }

            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // slingshot
            if (!saveState.weapons[4].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("SLINGSHOT", this.TEXT_X, this.SLINGSHOT_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("A child's favorite toy", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.SLINGSHOT_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.SLINGSHOT_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            if (saveState.weapons[4].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (slingshotDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].attack), this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (slingshotDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].dexterity), this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 108)
    
                this.setDefaultFillAndStroke(ctx);
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.slingshotDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.slingshotDmgCost;
                if (slingshotDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.slingshotDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SLINGSHOT_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.slingshotDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.slingshotDxtCost;
                if (slingshotDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.slingshotDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SLINGSHOT_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.slingshotUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.SLINGSHOT_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.SLINGSHOT_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.SLINGSHOT_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.SLINGSHOT_TEXT_Y);
            }
    
            this.setDefaultFillAndStroke(ctx);
            this.setLargeStroke(ctx);

        // bow
            if (!saveState.weapons[5].bought) {
                this.setStrokeAndFillDark(ctx);
            }
            this.setLargeFont(ctx);
            ctx.fillText("BOW", this.TEXT_X, this.BOW_TEXT_Y);
            this.setSmallFont(ctx);
            ctx.fillText("Your enemies will quiver", this.TEXT_X + this.DESCRIPTION_OFFSET_X, this.BOW_TEXT_Y + this.DESCRIPTION_OFFSET_Y);
            ctx.strokeRect(this.BOX_X, this.BOW_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
            if (saveState.weapons[5].bought) {
                // bought the weapon, so show damage and dexterity upgrade stuff
                if (bowDmgMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[5].attack), this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 53)
                this.setDefaultFillAndStroke(ctx);
                if (bowDxtMax) {
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[5].dexterity), this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 108)
    
                this.setDefaultFillAndStroke(ctx);
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.bowDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.bowDmgCost;
                if (bowDmgMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.bowDmgCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.BOW_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.bowDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.bowDxtCost;
                if (bowDxtMax) {
                    costStr = "MAX!";
                    this.setStrokeAndFillMaxLevel(ctx);
                }
                if (saveState.currency < this.bowDxtCost) {
                    this.setStrokeAndFillDark(ctx);
                }
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.BOW_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.bowUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                if (saveState.currency < this.BOW_UNLOCK_COST) {
                    this.setStrokeAndFillDark(ctx);
                }
                this.setCostFont(ctx);
                ctx.strokeRect(this.UNLOCK_X, this.BOW_TEXT_Y - this.UNLOCK_OFFSET_Y, this.UNLOCK_WIDTH, this.UNLOCK_HEIGHT);
                ctx.fillText("Unlock $" + this.BOW_UNLOCK_COST, this.UNLOCK_X + this.UNLOCK_TEXT_OFFSET_X, this.BOW_TEXT_Y);
            }    

            let iconOffset = 10;
            this.swordImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.SWORD_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.axeImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.AXE_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.whipImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.WHIP_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.flailImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.FLAIL_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.slingshotImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.SLINGSHOT_BOX_Y + iconOffset, PARAMS.SCALE * 2);
            this.bowImage.drawFrame(this.game.clockTick, ctx, this.BOX_X, this.BOW_BOX_Y+ iconOffset, PARAMS.SCALE * 2);
            
            this.setDefaultFillAndStroke(ctx);

            ctx.fillText("Damage increases attack damage", 20, 930);
            ctx.fillText("Dexterity increases attack speed", 20, 955);

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
                // note: only includes boxes for sword
                ctx.strokeRect(this.swordDmgUpgradeBB.x, this.swordDmgUpgradeBB.y, this.swordDmgUpgradeBB.width, this.swordDmgUpgradeBB.height);
                ctx.strokeRect(this.swordDxtUpgradeBB.x, this.swordDxtUpgradeBB.y, this.swordDxtUpgradeBB.width, this.swordDxtUpgradeBB.height);
                ctx.strokeRect(this.swordUnlockBB.x, this.swordUnlockBB.y, this.swordUnlockBB.width, this.swordUnlockBB.height);
         
            } else {
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.openShopBB.x - this.game.camera.x, this.openShopBB.y - this.game.camera.y, this.openShopBB.width, this.openShopBB.height);
                console.log(this.openShopBB);
                console.log(this.shopMouseBB)
            }
           
        }

    };
};

class StatsShop {
    constructor(game) {
        Object.assign(this, {game});

        this.enteredShop = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/stats_icons.png");
        
        this.speedImage = new AnimationGroup(this.spritesheet, 0, 0, 12, 12, 1, 1, false, true);
        this.healthImage = new AnimationGroup(this.spritesheet, 12, 0, 12, 12, 1, 1, false, true);
        this.manaImage = new AnimationGroup(this.spritesheet, 24, 0, 12, 12, 1, 1, false, true);
        this.vitalityImage = new AnimationGroup(this.spritesheet, 36, 0, 12, 12, 1, 1, false, true);
        this.wisdomImage = new AnimationGroup(this.spritesheet, 48, 0, 12, 12, 1, 1, false, true);
        this.defenseImage = new AnimationGroup(this.spritesheet, 60, 0, 12, 12, 1, 1, false, true);
                
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
        this.ENTER_TEXT_Y = 39.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE;
        
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
        this.openShopBB = new BoundingBox(this.ENTER_TEXT_X, this.ENTER_TEXT_Y, 350, 50);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);  
        this.shopMouseBB = new BoundingBox(0, 0, 1, 1);  

        this.speedUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X + (PARAMS.BLOCKWIDTH * PARAMS.SCALE / 2), this.SPEED_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.healthUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.HEALTH_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.manaUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X, this.MANA_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
        this.vitalityUpgradeBB = new BoundingBox(this.UPGRADE_BOX_X + (PARAMS.BLOCKWIDTH * PARAMS.SCALE / 2), this.VITALITY_BOX_Y + this.UPGRADE_BOX_OFFSET_Y , this.UPGRADE_BOX_WIDTH, this.UPGRADE_BOX_HEIGHT);
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

            // save game to ensure if something was bought it is saved
            saveGame(saveState);

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
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.openShopBB.x - this.game.camera.x, this.openShopBB.y - this.game.camera.y, this.openShopBB.width, this.openShopBB.height);
            }
           
        }

    };
};