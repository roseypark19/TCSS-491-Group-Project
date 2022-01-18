/* TODO UPDATE SUMMARY TO MATCH GAMEE
    Summary: 
        The scene_manager has MAX_<CATEGORY>_LEVEL and <category>Level that
        represent the max level for a particular category 
        and the current level for a particular level.
        
        The Shop has <CATEGORY>_COSTS that has the cost for each level of a category, 
        as well as <category>Cost which is the current cost for the level of a category.

        This class allows the user to upgrade the level for a particular category.
        When a category is upgraded, the cost is decremented from the scene_manager cash.
        The categoryLevel is also incremented to represent the upgrade

        The main character will have particular stats that will be selected based 
        on the state of each category level represented in the scene_manager.

*/
class WeaponsShop {
    constructor(game) {
        Object.assign(this, {game});
        // this.cashSheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        // this.cashAnimation = new Animator(this.cashSheet, 0, 0, 24, 24, 6, 0.2, 0, false, true);

        this.enteredShop = true;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ui/weapon_icons.png");
        
        this.swordImage = new AnimationGroup(this.spritesheet, 24, 0, 12, 12, 1, 1, false, true);
        this.axeImage = new AnimationGroup(this.spritesheet, 48, 0, 12, 12, 1, 1, false, true);
        this.whipImage = new AnimationGroup(this.spritesheet, 60, 0, 12, 12, 1, 1, false, true);
        this.flailImage = new AnimationGroup(this.spritesheet, 36, 0, 12, 12, 1, 1, false, true);
        this.slingshotImage = new AnimationGroup(this.spritesheet, 0, 0, 12, 12, 1, 1, false, true);
        this.bowImage = new AnimationGroup(this.spritesheet, 12, 0, 12, 12, 1, 1, false, true);
                
        this.addConstants();
        this.addBBs();
        
        // this.speedCost = this.SPEED_COSTS[0];
        // this.jumpCost = this.JUMP_COSTS[0];
        // this.healthCost = this.HEALTH_COSTS[0];
        // this.timeCost = this.TIME_COSTS[0];
        // this.ammoCost = this.AMMO_COSTS[0];
        // this.shootSpeedCost = this.SHOOT_SPEED_COSTS[0];
        // this.multiplierCost = this.MULTIPLIER_COSTS[0];
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
        
        // play button stats
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
        this.game.MAX_DMG_LEVEL = 10;
        this.game.MAX_DXT_LEVEL = 10;
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

        this.SWORD_UNLOCK_COST = 0;
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
        this.BB = new BoundingBox(205 * PARAMS.BLOCKWIDTH, 105 * PARAMS.BLOCKWIDTH, 32 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        this.openShopBB = new BoundingBox(this.ENTER_TEXT_X - this.game.camera.x - 9, this.ENTER_TEXT_Y - this.game.camera.y, 350, 50);

        this.mouseBB = new BoundingBox(0, 0, 1, 1);  
        this.shopMouseBB = new BoundingBox(0, 0, 1, 1);  
         
        // this.swordBB = new BoundingBox(this.BOX_X, this.SWORD_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        // this.axeBB = new BoundingBox(this.BOX_X, this.AXE_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        // this.whipBB = new BoundingBox(this.BOX_X, this.WHIP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        // this.flailBB = new BoundingBox(this.BOX_X, this.FLAIL_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        // this.slingshotBB = new BoundingBox(this.BOX_X, this.SLINGSHOT_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        // this.bowBB = new BoundingBox(this.BOX_X, this.BOW_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

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
        // ctx.fillStyle = "LightGrey";
        // ctx.strokeStyle = "LightGrey";
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

    setSmallFont(ctx) {
        ctx.font = 24 + 'px "silkscreennormal"';
    }
    setCostFont(ctx) {
        ctx.font = 30 + 'px "silkscreennormal"';
    }
    setMediumFont(ctx) {
        ctx.font = 40 + 'px "silkscreennormal"';
    }
    setLargeFont(ctx) {
        ctx.font = 72 + 'px "silkscreennormal"'; 
    }

    playUpgradeSound(isMaxLevel) {
        if (isMaxLevel) {
            // ASSET_MANAGER.playAsset("./assets/audio/MaxLevelUpgrade.wav");
        } else {
            // ASSET_MANAGER.playAsset("./assets/audio/Upgrade.wav");
        }
        
    }

    update() {
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y, 1, 1);
            this.shopMouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
        }

        if (this.enteredShop) { // updates when user is in shop
            // exit button
            if (this.game.clicked && this.shopMouseBB.collide(this.exitBB)) {
                console.log("exited")
                this.enteredShop = false;
            }


        } else { // updates when user is not in shop
            if (this.BB.collide(this.game.camera.hero.BB) &&
                    this.game.clicked && this.openShopBB.collide(this.mouseBB)) {
                    this.enteredShop = true;
            }
        }
        
       

        

        // // check for a click 
        // if (this.game.click) {
        //     // update the click bounding box so we can use it
        //     this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);
        //     let upgraded = false;   
            
        //     // for the speed, jump, time, ammo, shoot speed, and multilier boxes, 
        //     // we need to: 
        //     //  - check to see if the mouse clicked on the box
        //     //  - check to see if we have enough cash to buy that upgrade
        //     //  - check to see if the current upgrade level is not max

        //     // click speed
        //     if (this.mouseBB.collide(this.speedBB) 
        //             && this.game.savedData.cash >= this.speedCost 
        //             && this.game.savedData.speedLevel < this.game.MAX_SPEED_LEVEL) {
        //         upgraded = true;
        //         this.game.savedData.speedLevel++;
        //         this.game.savedData.cash -= this.speedCost;
        //         this.playUpgradeSound(this.game.savedData.speedLevel == this.game.MAX_SPEED_LEVEL);
        //     }
        //     // click jump
        //     if (this.mouseBB.collide(this.jumpBB) 
        //             && this.game.savedData.cash >= this.jumpCost 
        //             && this.game.savedData.jumpLevel < this.game.MAX_JUMP_LEVEL) { 

        //         upgraded = true;
        //         this.game.savedData.jumpLevel++;
        //         this.game.savedData.cash -= this.jumpCost;
        //         this.playUpgradeSound(this.game.savedData.jumpLevel == this.game.MAX_JUMP_LEVEL);
        //     }
        //     // click health
        //     if (this.mouseBB.collide(this.healthBB) 
        //             && this.game.savedData.cash >= this.healthCost 
        //             && this.game.savedData.healthLevel < this.game.MAX_HEALTH_LEVEL) {

        //         upgraded = true;
        //         this.game.savedData.healthLevel++;
        //         this.game.savedData.cash -= this.healthCost;
        //         this.playUpgradeSound(this.game.savedData.healthLevel == this.game.MAX_HEALTH_LEVEL);
        //     }
        //     // click time
        //     if (this.mouseBB.collide(this.timeBB) 
        //             && this.game.savedData.cash >= this.timeCost 
        //             && this.game.savedData.timeLevel < this.game.MAX_TIME_LEVEL) {
                    
        //         upgraded = true;
        //         this.game.savedData.timeLevel++;
        //         this.game.savedData.cash -= this.timeCost;
        //         this.playUpgradeSound(this.game.savedData.timeLevel == this.game.MAX_TIME_LEVEL);
        //     }
        //     // click ammo
        //     if (this.mouseBB.collide(this.ammoBB) 
        //             && this.game.savedData.cash >= this.ammoCost 
        //             && this.game.savedData.ammoLevel < this.game.MAX_AMMO_LEVEL) { 

        //         upgraded = true;
        //         this.game.savedData.ammoLevel++;
        //         this.game.savedData.cash -= this.ammoCost;
        //         this.playUpgradeSound(this.game.savedData.ammoLevel == this.game.MAX_AMMO_LEVEL);
        //     }
        //     // click shoot speed
        //     if (this.mouseBB.collide(this.shootSpeedBB)
        //              && this.game.savedData.cash >= this.shootSpeedCost 
        //             && this.game.savedData.shootSpeedLevel < this.game.MAX_SHOOT_SPEED_LEVEL) { 

        //         upgraded = true;
        //         this.game.savedData.shootSpeedLevel++;
        //         this.game.savedData.cash -= this.shootSpeedCost;
        //         this.playUpgradeSound(this.game.savedData.shootSpeedLevel == this.game.MAX_SHOOT_SPEED_LEVEL);
        //     }
        //     // click multiplier
        //     if (this.mouseBB.collide(this.multiplierBB) 
        //             && this.game.savedData.cash >= this.multiplierCost 
        //             && this.game.savedData.multiplierLevel < this.game.MAX_MULTIPLIER_LEVEL) { 

        //         upgraded = true;
        //         this.game.savedData.multiplierLevel++;
        //         this.game.savedData.cash -= this.multiplierCost;
        //         if (this.game.savedData.multiplierLevel == this.game.MAX_MULTIPLIER_LEVEL) {
        //             this.playUpgradeSound(true);
        //         } else {   
        //             ASSET_MANAGER.playAsset("./assets/audio/CoinUpgrade.wav");
        //         }
        //     }

        //     // if the player upgraded something, save that data
        //     if (upgraded) {
        //         storeData(this.game.savedData);
        //     }

        //     // click play
        //     if (this.mouseBB.collide(this.playBB)) {  
        //         this.game.camera.play();
        //     }

        //     this.game.click = null;
        // }

        // if (this.game.mouse) {
        //     this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        // }
        
    };

    // formats and returns the upgrade level text depending on the current 
    // level and the maximum possible level
    formatLevel(currentLevel, maxLevel = 10) {
        return String(currentLevel).padStart(2, '0') + "/" + String(maxLevel).padStart(2, '0');
    }
    calcUpgradeCostX(costStr) {
        return this.DAMAGE_BOX_X + 4 + (13 * (5 - costStr.length))
    }


    setLargeStroke(ctx) {
        ctx.lineWidth = 8;
    }

    setSmallStroke(ctx) {
        ctx.lineWidth = 5;
    }

    
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[0].attack), this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[0].dexterity), this.DAMAGE_TEXT_X, this.SWORD_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.swordDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.swordDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SWORD_BOX_Y + 41)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.swordDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.swordDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SWORD_BOX_Y + 96)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SWORD_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);
            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.swordUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[1].attack), this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[1].dexterity), this.DAMAGE_TEXT_X, this.AXE_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.axeDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.axeDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.AXE_BOX_Y + 41)
                // ctx.fillText("$1000", this.DAMAGE_BOX_X + 4, this.AXE_BOX_Y + 41)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.axeDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                costStr = "$" + this.axeDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.AXE_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.AXE_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.axeUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[2].attack), this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[2].dexterity), this.DAMAGE_TEXT_X, this.WHIP_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.whipDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                }
                costStr = "$" + this.whipDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WHIP_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.whipDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.whipDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.WHIP_BOX_Y + 96) 
                // ctx.fillText("$9999", this.DAMAGE_BOX_X + 4, this.WHIP_BOX_Y + 96)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.WHIP_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.whipUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[3].attack), this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[3].dexterity), this.DAMAGE_TEXT_X, this.FLAIL_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.flailDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.flailDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.FLAIL_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.flailDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.flailDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.FLAIL_BOX_Y + 96) 
                // ctx.fillText("$9999", this.DAMAGE_BOX_X + 4, this.FLAIL_BOX_Y + 96)
                ctx.strokeRect(this.DAMAGE_BOX_X, this.FLAIL_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.flailUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].attack), this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].dexterity), this.DAMAGE_TEXT_X, this.SLINGSHOT_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.slingshotDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.slingshotDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SLINGSHOT_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.slingshotDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.slingshotDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.SLINGSHOT_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.SLINGSHOT_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.slingshotUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                ctx.fillText("Damage", this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 30);            
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].attack), this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 53)
                ctx.fillText("Dexterity", this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 85)
                ctx.fillText("Lvl: " + this.formatLevel(saveState.weapons[4].dexterity), this.DAMAGE_TEXT_X, this.BOW_BOX_Y + 108)
    
                this.setSmallStroke(ctx);
                this.setCostFont(ctx);
                
                if (this.shopMouseBB.collide(this.bowDmgUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.bowDmgCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.BOW_BOX_Y + 41) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DAMAGE_BOX_OFFSET_Y , this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                
                this.setDefaultFillAndStroke(ctx);
                 
                if (this.shopMouseBB.collide(this.bowDxtUpgradeBB)) {
                    this.setStrokeAndFillGreen(ctx);
                } 
                costStr = "$" + this.bowDxtCost
                ctx.fillText(costStr, this.calcUpgradeCostX(costStr), this.BOW_BOX_Y + 96) 
                ctx.strokeRect(this.DAMAGE_BOX_X, this.BOW_BOX_Y + this.DEXTERITY_BOX_OFFSET_Y, this.DAMAGE_UPGRADE_WIDTH, this.DAMAGE_UPGRADE_HEIGHT);
                this.setDefaultFillAndStroke(ctx);

            } else {
                // weapon not bought yet
                this.setDefaultFillAndStroke(ctx);
                if (this.shopMouseBB.collide(this.bowUnlockBB)) {
                    this.setStrokeAndFillGreen(ctx);
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
                console.log(this.openShopBB)
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.openShopBB.x - this.game.camera.x, this.openShopBB.y - this.game.camera.y, this.openShopBB.width, this.openShopBB.height);
            }
           
        }

    };
};