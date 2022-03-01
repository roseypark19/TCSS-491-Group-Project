class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.drawInventory = true;
        this.elapsed = 0;
        this.travelTo(town);
    };

    clearEntities() {
        this.game.heroIndex = undefined;
        this.game.entities.forEach(entity => entity.removeFromWorld = true);
    };

    loadLevel(level) {
        let isOverworld = level == overworld;
        let isTown = level == town;
        this.overworld = isOverworld;
        this.isCutScene = true;
        this.clearEntities();
        for (let i = 0; i < level.layer_names.length; i++) {
            let layer_name = level.layer_names[i];
            if (layer_name === "hero") {
                if (isOverworld) {
                    this.game.addEntity(props[2].base(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].base(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.hero = new TinyHero(this.game, this.createDestinations(level));
                    // this.hero = new Hero(this.game, 0, 0);
                    this.game.addEntity(this.hero);
                    let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };
                    this.y = this.hero.destinations[0].originY - midpoint.y;
                    this.game.addEntity(props[2].topper(this.game, 64 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));
                    this.game.addEntity(props[1].topper(this.game, 252 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 55.5 * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE - 2 * PARAMS.OVERWORLD_SCALE, true));

                } else if (isTown) {
                    this.addPropBases();
                    this.game.addEntity(new Portal(this.game, "Enter Overworld", overworld, 0, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 33 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 30 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                    this.hero = new Hero(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                    this.addPropToppers();
                    this.addPropShadows();

                } else if (this.currentLevel == castle) {
                    this.addPropBases();
                    this.addNonCollidablePropBases();
                    this.addPropShadows();
                    this.game.addEntity(new Portal(this.game, "Leave " + this.currentLevel.levelName, overworld, 5, this.currentLevel.cowardPortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxWidth));
                    this.hero = new Hero(this.game, castle.heroX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                         castle.heroY * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                    this.addPropToppers();

                }  else if (this.currentLevel == titleScreen || this.currentLevel == elementAwardScreen || this.currentLevel == cutSceneScreen) {
                    // do nothing lol
                    this.hero = new Hero(this.game, this.currentLevel.heroX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                        this.currentLevel.heroY * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                } else {
                    // generic hero and prop placement used for most levels 
                    // (see levels json for data for each level)
                    
                    this.addNonCollidablePropBases();
                    this.addPropBases();
                    // coward portal
                    if (this.currentLevel != druid_lair) {
                        this.game.addEntity(new Portal(this.game, "Leave " + this.currentLevel.levelName, overworld, 5, this.currentLevel.cowardPortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxWidth));
                    } 
                    // hero
                    this.hero = new Hero(this.game, this.currentLevel.heroX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                                         this.currentLevel.heroY * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                    this.addPropToppers();
                    this.addPropShadows(); 
                }
                
            } else {
                this.loadLayer(level[layer_name], level, isOverworld);
            }
        } // end of environment layer loop
        // do things after main terrain has been added

        // loads the shops for the town at the end
        if (level == town) {
            this.game.addEntity(new Hen(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Hen(this.game, 37 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 16 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Chick(this.game, 34 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Chick(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new WeaponsShop(this.game));
            this.game.addEntity(new StatsShop(this.game));
            this.game.addEntity(new Dialogue(this.game, "Visit the shops to upgrade stats!", true, 34.5, 22, 33, 26, 3, 0.5)); // left bulletin board
            this.game.addEntity(new Dialogue(this.game, "Aim and attack with the mouse!", true, 41.5, 22, 40 , 26, 3, 0.5));   // right bulletin board
            
        } else if (level == overworld) {
            // add the portals for level nodes
            overworld.destinations.forEach(destination => {
                if (destination.stoppable) {
                    let pX = destination.origin.x - 1 / 2;
                    let pY = destination.origin.y;
                    this.game.addEntity(new Portal(this.game, "Enter " + destination.levelName, destination.level, -1, 
                                                   pX * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   pY * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   (pX - ((10 + destination.levelName.length) / 2)) * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   (pY + 3) * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE,
                                                   destination.buttonWidth));
                }
            });
            if (!saveState.gameFinished) {
                let final_dest = this.hero.destinations[this.hero.destinations.length - 1];
                this.game.addEntity(new GuidingArrow(this.game, final_dest.originX, final_dest.originY, true, true));
            }

        } else if (this.currentLevel == snow1) {
            this.game.addEntity(new Dialogue(this.game, "It's a hole!", true, 4, 15.5, 1, 17, 1, 1, true)); // upper left sign
            this.game.addEntity(new Dialogue(this.game, "Welcome to snow 1!", true, 19.5, 56.5, 21, 58, 2, 1, true)); // upper left sign
            this.game.addEntity(new Penguin(this.game, 52 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 41.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 48 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 46 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Penguin(this.game, 36 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 45 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 50 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 55 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, true));
            this.game.addEntity(new Penguin(this.game, 57 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 45 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            this.game.addEntity(new Penguin(this.game, 1.5 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, false));
            
            this.currentLevel.coins.forEach(coin => {
                this.game.addEntity(new Coin(this.game, coin.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.value));
            });
            
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
            // this.game.addEntity(new SwordedMinion(this.game, 35 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 14 * PARAMS.BLOCKWIDTH * PARAMS.SCALE));

            this.currentLevel.topper_props.forEach(prop => {
                if (props[prop.index].base) {
                    this.game.addEntity(props[prop.index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                }
            });
            this.currentLevel.topper_props.forEach(prop => {
                if (props[prop.index].shadow) {
                    this.game.addEntity(props[prop.index].shadow(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered));
                }
            });
        } else if (this.currentLevel == snow2) {
            this.currentLevel.coins.forEach(coin => {
                this.game.addEntity(new Coin(this.game, coin.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.value));
            });
            
            let penguins = [
                {x: 23, y: 3, facingRight: true},
                {x: 45, y: 1, facingRight: true},
                {x: 57, y: 2, facingRight: false},
                {x: 97, y: 1, facingRight: true},
                {x: 101, y: 1, facingRight: false},
                {x: 84, y: 11, facingRight: true},
                {x: 107, y: 30, facingRight: false},
                {x: 109, y: 76, facingRight: false},
                {x: 67, y: 22, facingRight: true},
                {x: 95, y: 48, facingRight: false},
            ];
            penguins.forEach(p => this.game.addEntity(new Penguin(this.game, p.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, p.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, p.facingRight)));
            this.game.addEntity(new Dialogue(this.game, "Beware of Ice!", true, 89.5, 41.5, 89, 42, 1, 1, true)); // ice sign
            this.game.addEntity(new Dialogue(this.game, "The water is warm!", true, 12.5, 69, 3, 68, 1, 1, true)); // lake sign
            this.game.addEntity(new Dialogue(this.game, "Welcome!", true, 44.5, 48, 47.5, 48.5, 1, 1, true)); // welcome!   
        } else if (this.currentLevel == titleScreen) {
            this.game.addEntity(new TitleScreen(this.game));

        }  else if (this.currentLevel == cutSceneScreen) {
            this.game.addEntity(new CutSceneScreen(this.game));

        } else if (this.currentLevel == elementAwardScreen) {
            this.game.addEntity(new ElementAwardScreen(this.game, this.currentLevel.elementIndex));
        } else if (this.currentLevel == castle) {
            this.currentLevel.coins.forEach(coin => {
                this.game.addEntity(new Coin(this.game, coin.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, coin.value));
            });
        }

        
        if (this.currentLevel == plains1) {
            this.x = 4;
            this.y = 2;
        }

        if (this.currentLevel == plains2) {
            this.x = 2;
            this.y = 1880;
        }
        if (this.currentLevel == swamp1) {
            this.x = 12.5;
            this.y = 14.5;
        }

        this.loadEnemies();

        this.totalEnemies = this.countEnemies();
      
        // add stats and ability displays
        if (!isOverworld && this.currentLevel !== cutSceneScreen) {
            this.statsDisplay = new StatsDisplay(this.game, 0, 20);
            this.weaponsDisplay = new WeaponsDisplay(this.game, 20, PARAMS.CANVAS_DIMENSION - 20);
            this.abilityDisplay = new AbilityDisplay(this.game, 20, PARAMS.CANVAS_DIMENSION - abilityDisplayDimension() - 20);
            this.currencyDisplay = new CurrencyDisplay(this.game, 0, 175);
            this.remEnemyDisplay = new RemainingEnemyDisplay(this.game, PARAMS.CANVAS_DIMENSION - 20 - (12 + 2 + 7 * 7) * PARAMS.GUI_SCALE, 20);
        }

        ASSET_MANAGER.pauseBackgroundMusic();

        if (level.music) {
            
            ASSET_MANAGER.autoRepeat(level.music);
            ASSET_MANAGER.playAsset(level.music);

        }
    };

    countEnemies() {
        let totalEnemies = 0;
        this.game.livingEntities.forEach(entity => {
            if (!(entity instanceof Hero) && !entity.removeFromWorld) {
                if (entity instanceof MotherSlime) {
                    totalEnemies += 4;
                } else {
                    totalEnemies++;
                }
            }
        });
        return totalEnemies;
    };

    addPropBases() {
        this.currentLevel.props.forEach(prop => {
            let index = prop.index;
            if (props[index].base) {
                let tile = props[index].base(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered);
                this.game.addEntity(tile);
                if (props[index].customAnim) {
                    let animData = props[index].customAnim;
                    tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                }
            }
        });
    };

    addPropToppers() {
        this.currentLevel.props.forEach(prop => {
            let index = prop.index;
            if (props[index].topper) {
                let tile = props[index].topper(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered);
                this.game.addEntity(tile);
                if (props[index].customAnim) {
                    let animData = props[index].customAnim;
                    tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                }
            }
        });
    };

    addPropShadows() {
        this.currentLevel.props.forEach(prop => {
            let index = prop.index;
            if (props[index].shadow) {
                let tile = props[index].shadow(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered);
                this.game.addEntity(tile);
                if (props[index].customAnim) {
                    let animData = props[index].customAnim;
                    tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                }
            }
        });
    };

    addNonCollidablePropBases() {
        this.currentLevel.props.forEach(prop => {
            let index = prop.index;
            if (props[index].bottomNotCollidable) {
                let tile = props[index].bottomNotCollidable(this.game, prop.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, prop.centered);
                this.game.addEntity(tile);
                if (props[index].customAnim) {
                    let animData = props[index].customAnim;
                    tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                }
            }
        });
    };

    createDestinations(level) {

        let destinations = [];
        for (let i = 0; i < level.destinations.length; i++) {
            let dest = level.destinations[i];
            destinations.push({originX: dest.origin.x * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 
                               originY: dest.origin.y * PARAMS.BLOCKWIDTH / 2 * PARAMS.OVERWORLD_SCALE, 
                               neighbors: dest.neighbors, stoppable: dest.stoppable});
                
            // this IF will stop adding destinations 
            // if the next dungeon locked
            if (dest.level != undefined && isFinalUnlockedDungeon(dest.level)) {
                break;                    
            }
        }
        return destinations;
    };

    loadLayer(property, level, isOverworld) {
        for (let i = 0; i < level.height; i++) {
            for  (let j = 0; j < level.width; j++) {
                let cell = level.width * i + j;
                let spriteCode = property.data[cell];
                let blockwidth = isOverworld ? PARAMS.BLOCKWIDTH / 2 : PARAMS.BLOCKWIDTH;
                let scale = isOverworld ? PARAMS.OVERWORLD_SCALE : PARAMS.SCALE
                if (spriteCode !== -1) {
                    let tile = new MapTile(this.game, 
                                           j * blockwidth * scale,
                                           i * blockwidth * scale,
                                           property.spritesheet,
                                           blockwidth * (spriteCode % property.imageWidth),
                                           blockwidth * (Math.floor(spriteCode / property.imageWidth)),
                                           blockwidth,
                                           scale,
                                           property.collideable);
                    if (property.hasOwnProperty("custom_animations") && 
                            property.custom_animations.hasOwnProperty(spriteCode)) {
                        let animData = property.custom_animations[spriteCode];
                        tile.alterTileAnimation(animData.frameCount, animData.frameDuration, animData.framePadding);
                    }
                    this.game.addEntity(tile);
                }
            }
        }
    };

    loadEnemies() {
        if (this.currentLevel.enemies != undefined) {
            this.currentLevel.enemies.forEach(enemy => {
                switch (enemy.type) {
                    case PolarBear:
                        this.game.addEntity(new PolarBear(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Yeti:
                        this.game.addEntity(new Yeti(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Snowman:
                        this.game.addEntity(new Snowman(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case SwordedMinion:
                        this.game.addEntity(new SwordedMinion(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.minionType));
                        break;
                    case RangedMinion:
                        this.game.addEntity(new SwordedMinion(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.minionType));
                        break;
                    case Troll:
                        this.game.addEntity(new Troll(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Rhino:
                        this.game.addEntity(new Rhino(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Flame:
                        this.game.addEntity(new Flame(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Centaur:
                        this.game.addEntity(new Centaur(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Cyclops:
                        this.game.addEntity(new Cyclops(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Wargo:
                        this.game.addEntity(new Wargo(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Zombie:
                        this.game.addEntity(new Zombie(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Ogre:
                        this.game.addEntity(new Ogre(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case GiantToad:
                        this.game.addEntity(new GiantToad(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case MotherSlime:
                        this.game.addEntity(new MotherSlime(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.green));
                        break;
                    case BabySlime:
                        this.game.addEntity(new BabySlime(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.green));
                        break;
                    case Minotaur:
                        this.game.addEntity(new Minotaur(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Druid:
                        this.game.addEntity(new Druid(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, Druid.maxHp, 0));
                        break;
                    case Skeleton:
                        this.game.addEntity(new Skeleton(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                    case Tentacle:
                        this.game.addEntity(new Tentacle(this.game, enemy.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, enemy.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE));
                        break;
                }
            });
        }
    }

    update() {

        if (PARAMS.GAMEOVER) {
            this.elapsed = Math.min(4, this.elapsed + this.game.clockTick);
        }

        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.updateAudio();
        let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };

        if (this.currentLevel != overworld) {
            // this code restricts x, y camera based on the town
            if (this.hero.BB.center.x >= midpoint.x && this.hero.BB.center.x <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * this.currentLevel.width - midpoint.x) {
                this.x = this.hero.BB.center.x - midpoint.x;
            }
            if (this.hero.BB.center.y >= midpoint.y && this.hero.BB.center.y <= PARAMS.BLOCKWIDTH * PARAMS.SCALE * this.currentLevel.height - midpoint.y) {
                this.y = this.hero.BB.center.y - midpoint.y;
            }
        } else {
            this.x = this.hero.BB.center.x - midpoint.x;
        }
        let heroDead = this.hero.hp <= 0;
        if (PARAMS.GAMEOVER) {
            if (heroDead && this.elapsed === 4) {
                this.travelTo(overworld);
            } else if (!heroDead && !this.portalFlag && this.currentLevel !== town && this.currentLevel !== titleScreen && this.currentLevel !== elementAwardScreen && this.currentLevel !== cutSceneScreen) {
                
                this.portalFlag = true;
                let portal;
                if (this.currentLevel == castle) {
                    portal = new Portal(this.game, "Enter " + "Druid's Lair", druid_lair, this.currentLevel.portalIndex, this.currentLevel.completePortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxWidth, true);
                } else {
                    portal = new Portal(this.game, "Complete " + this.currentLevel.levelName, overworld, this.currentLevel.portalIndex, this.currentLevel.completePortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxWidth, true);
                }
                portal.npc = true;
                portal.id = ++PARAMS.NPC_ID;
                this.game.addEntity(portal);
            } 
        }
    };

    travelTo(level) {
        PARAMS.GAMEOVER = false;
        this.portalFlag = false;
        this.elapsed = 0;
        this.currentLevel = level;
        this.loadLevel(level, level == overworld, level == town);
    };

    updateAudio() {
        // audio volume
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    draw(ctx) { 
        if (this.currentLevel !== overworld && this.currentLevel !== titleScreen && this.currentLevel !== elementAwardScreen && this.currentLevel !== cutSceneScreen) {
            this.statsDisplay.draw(ctx);

            if (this.game.inventoryPressed && !this.inventoryFlag) {
                this.inventoryFlag = true;
                this.drawInventory = !this.drawInventory;
            } else if (!this.game.inventoryPressed) {
                this.inventoryFlag = false;
            }

            if (this.drawInventory) {
                this.weaponsDisplay.draw(ctx);
                this.abilityDisplay.draw(ctx);
            }

            this.currencyDisplay.draw(ctx);
            if (this.currentLevel !== town) {
                this.remEnemyDisplay.draw(ctx);
            }
        }

        if (PARAMS.GAMEOVER) {
            if (this.hero.hp > 0 && this.elapsed < 4 && this.currentLevel !== town && this.currentLevel !== titleScreen && this.currentLevel !== elementAwardScreen) {
                ctx.fillStyle = rgb(255, 215, 0);
                ctx.font = 5 * PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';
                ctx.fillText("LEVEL COMPLETE", 
                             this.hero.BB.center.x - this.x - 5.5 * 5 * PARAMS.BLOCKWIDTH, 
                             this.hero.BB.top - this.y);
            } else if (this.hero.hp <= 0 && this.currentLevel !== overworld) {
                ctx.fillStyle = "Red";
                ctx.font = 5 * PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';
                ctx.fillText("YOU DIED", 
                             this.hero.BB.center.x - this.x - 3.5 * 5 * PARAMS.BLOCKWIDTH, 
                             this.hero.BB.top - this.y);
            }
        } 
    };
};

class StatsDisplay {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.flickerTimer = 0;
        this.flickerFlag = false;
        this.hpMpSprite = ASSET_MANAGER.getAsset("./sprites/ui/icons.png");
        this.barSprite = ASSET_MANAGER.getAsset("./sprites/ui/bars.png");
        this.barShadowSprite = ASSET_MANAGER.getAsset("./sprites/ui/bars_shadows.png");
        this.frameSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames.png");
        this.frameShadowSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames_shadows.png");
    };

    draw(ctx) {

        this.flickerTimer = Math.max(0, this.flickerTimer - this.game.clockTick);
        const dimension = statsDisplayDimension();
        const hero = this.game.camera.hero;

        // frame shadow
        ctx.drawImage(this.frameShadowSprite, 47 + 25 + 8, 159, 17, 12.5, this.x, this.y, 17 * PARAMS.GUI_SCALE, dimension / 2);
        ctx.drawImage(this.frameShadowSprite, 47 + 25 + 8, 159 + 25 + 12.5, 17, 12.5, this.x, this.y + dimension / 2, 17 * PARAMS.GUI_SCALE, dimension / 2);

        // hp bar shadow
        ctx.drawImage(this.barShadowSprite, 87, 36, 17, 7, this.x + 10 * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 17 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 9, 36, 16, 7, this.x + (10 + 17) * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 9, 36, 16, 7, this.x + (10 + 33) * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 17, 36, 17, 7, this.x + (10 + 49) * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 17 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);

        // mp bar shadow
        ctx.drawImage(this.barShadowSprite, 87, 36, 17, 7, this.x + 10 * PARAMS.GUI_SCALE, this.y + 13 * PARAMS.GUI_SCALE, 17 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 9, 36, 16, 7, this.x + (10 + 17) * PARAMS.GUI_SCALE, this.y + 13 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 9, 36, 16, 7, this.x + (10 + 33) * PARAMS.GUI_SCALE, this.y + 13 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barShadowSprite, 87 + 17, 36, 17, 7, this.x + (10 + 49) * PARAMS.GUI_SCALE, this.y + 13 * PARAMS.GUI_SCALE, 17 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);

        // frame and icons
        ctx.drawImage(this.frameSprite, 48 + 32, 160, 16, 12, this.x, this.y + PARAMS.GUI_SCALE, dimension - 9 * PARAMS.GUI_SCALE, (dimension - 2 * PARAMS.GUI_SCALE) / 2);
        ctx.drawImage(this.frameSprite, 48 + 32, 160 + 36, 16, 12, this.x, this.y + dimension / 2, dimension - 9 * PARAMS.GUI_SCALE, (dimension - 2 * PARAMS.GUI_SCALE) / 2);
        ctx.drawImage(this.hpMpSprite, 41, 57, 7, 7, this.x + 3 * PARAMS.GUI_SCALE,
                                                     this.y + 5 * PARAMS.GUI_SCALE,
                                                     7 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.hpMpSprite, 41, 65, 7, 7, this.x + 3 * PARAMS.GUI_SCALE,
                                                     this.y + 13 * PARAMS.GUI_SCALE,
                                                     7 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE);
                    
        // hp bar
        if (hero.hp / hero.maxHp * 100 > 25) {
            this.flickerFlag = false;
        }
        if (hero.hp / hero.maxHp * 100 <= 25 && this.flickerTimer === 0) {
            this.flickerTimer = 0.25;
            this.flickerFlag = !this.flickerFlag;
        }

        ctx.fillStyle = this.flickerFlag ? rgb(228, 84, 110) : rgb(198, 27, 58);
        ctx.fillRect(this.x + 13 * PARAMS.GUI_SCALE, this.y + 7 * PARAMS.GUI_SCALE, 60 * Math.max(0, hero.hp) / hero.maxHp * PARAMS.GUI_SCALE, 3 * PARAMS.GUI_SCALE);

        ctx.drawImage(this.barSprite, 88, 37, 16, 5, this.x + 11 * PARAMS.GUI_SCALE, this.y + 6 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 8, 37, 16, 5, this.x + (11 + 16) * PARAMS.GUI_SCALE, this.y + 6 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 8, 37, 16, 5, this.x + (11 + 32) * PARAMS.GUI_SCALE, this.y + 6 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 16, 37, 16, 5, this.x + (11 + 48) * PARAMS.GUI_SCALE, this.y + 6 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);

        // mp bar
        ctx.fillStyle = rgb(101, 219, 241);
        ctx.fillRect(this.x + 13 * PARAMS.GUI_SCALE, this.y + 15 * PARAMS.GUI_SCALE, 60 * hero.mp / hero.maxMp * PARAMS.GUI_SCALE, 3 * PARAMS.GUI_SCALE);

        ctx.drawImage(this.barSprite, 88, 37, 16, 5, this.x + 11 * PARAMS.GUI_SCALE, this.y + 14 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 8, 37, 16, 5, this.x + (11 + 16) * PARAMS.GUI_SCALE, this.y + 14 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 8, 37, 16, 5, this.x + (11 + 32) * PARAMS.GUI_SCALE, this.y + 14 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);
        ctx.drawImage(this.barSprite, 88 + 16, 37, 16, 5, this.x + (11 + 48) * PARAMS.GUI_SCALE, this.y + 14 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE, 5 * PARAMS.GUI_SCALE);      
    };
};

class AbilityDisplay {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.frameSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames.png");
        this.frameShadowSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames_shadows.png");
    };

    draw(ctx) {

        const dimension = abilityDisplayDimension();
        const hero = this.game.camera.hero;
        const spacing = 10;
    
       // console.log(this.y);
        // frame shadow
        ctx.drawImage(this.frameShadowSprite, 47, 239, 5, 18, this.x, this.y, 5 * PARAMS.GUI_SCALE, dimension);
        let x = this.x + 5 * PARAMS.GUI_SCALE;
        for (let i = 0; i < hero.abilityData.length; i++) {
            ctx.drawImage(this.frameShadowSprite, 50, 239, spacing, 18, x, this.y, spacing * PARAMS.GUI_SCALE, dimension);
            x += spacing * PARAMS.GUI_SCALE;
        }
        ctx.drawImage(this.frameShadowSprite, 92, 239, 5, 18, x, this.y, 5 * PARAMS.GUI_SCALE, dimension);

        // frame
        ctx.drawImage(this.frameSprite, 48, 128, 4, 16, this.x + PARAMS.GUI_SCALE, this.y + PARAMS.GUI_SCALE, 4 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE);
        x = this.x + 5 * PARAMS.GUI_SCALE;
        for (let i = 0; i < hero.abilityData.length; i++) {
            ctx.drawImage(this.frameSprite, 52, 128, spacing, 16, x, this.y + PARAMS.GUI_SCALE, spacing * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE);
            x += spacing * PARAMS.GUI_SCALE;
        }
        ctx.drawImage(this.frameSprite, 92, 128, 4, 16, x, this.y + PARAMS.GUI_SCALE, 4 * PARAMS.GUI_SCALE, 16 * PARAMS.GUI_SCALE);

        // ability icons and buttons
        const drawScale = PARAMS.GUI_SCALE - 4;
        x = this.x + (5 + spacing / 2) * PARAMS.GUI_SCALE;
        let y = this.y + dimension / 2;
        ctx.fillStyle = ctx.strokeStyle = "Black";
        ctx.font = 20 + 'px "silkscreennormal"';
        for (let i = 0; i < hero.abilityData.length; i++) {
            let data = hero.abilityData[i];
            ctx.drawImage(hero.abilitySpritesheet, data.x + 96 * hero.spellType, data.y, 32, 32, 
                          x - 16 * drawScale, y - hero.spriteCenter * drawScale, 32 * drawScale, 32 * drawScale);
            ctx.fillText(data.button, x + 3 * drawScale, y + 10 * drawScale);
            ctx.strokeText(data.button, x + 3 * drawScale, y + 10 * drawScale);
            x += spacing * PARAMS.GUI_SCALE;
        }
    };
};

class WeaponsDisplay {

    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.frameSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames.png");
        this.frameShadowSprite = ASSET_MANAGER.getAsset("./sprites/ui/frames_shadows.png");
    };

    draw(ctx) {

        const hero = this.game.camera.hero;
        const spacing = 12;
        let x = this.x + 141.5 * PARAMS.GUI_SCALE;
      
        // frame shadow
        ctx.drawImage(this.frameShadowSprite, 15, 316, 18, 5, x, this.y - 2.45 * spacing, 18 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 5);
        let y = this.y - 4.65 * PARAMS.GUI_SCALE;
        for (let i = 0; i < hero.weaponData.length; i++) {
            ctx.drawImage(this.frameShadowSprite, 15, 297, 18, spacing, x, y - 5.75 * spacing,  18.05 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 11.5);
            y -= 5.75 * spacing;
        }
        ctx.drawImage(this.frameShadowSprite, 15, 271, 18, 5, x, y - spacing * 2.5, 18 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 5);

        // background frame
        ctx.drawImage(this.frameSprite, 16, 204, 16, 4, x + PARAMS.GUI_SCALE, this.y - 2.45 * spacing, 16 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 4);
        y = this.y - 4.65 * PARAMS.GUI_SCALE;
        for (let i = 0; i < hero.weaponData.length; i++) {
            ctx.drawImage(this.frameSprite, 16, 192, 18, spacing, x + PARAMS.GUI_SCALE, y - 5.75 * spacing,  18.05 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 11.5);
            y -= 5.75 * spacing;
        }
        ctx.drawImage(this.frameSprite, 16, 160, 16, 4, x + PARAMS.GUI_SCALE, y - spacing * 2 , 16 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 4);


         // frame
         y = this.y - 4.65 * PARAMS.GUI_SCALE;
         for (let i = 0; i < hero.weaponData.length; i++) {
             if ( hero.weaponData[i].type === hero.weapon.type) {
                ctx.drawImage(this.frameSprite, 562, 114, 12, spacing, x + PARAMS.GUI_SCALE * 2, y - 5.75 * spacing,  14.05 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 11.5);
             y -= 5.75 * spacing; 
             } else {
                ctx.drawImage(this.frameSprite, 562, 34, 12, spacing, x + PARAMS.GUI_SCALE * 2, y - 5.75 * spacing,  14.05 * PARAMS.GUI_SCALE, PARAMS.GUI_SCALE * 11.5);                y -= 5.75 * spacing;
             }
         }
       
       // the icons
        const drawScale = PARAMS.GUI_SCALE;
        x = x + 32;
        y = this.y - 7 * spacing;
        for (let i = 0; i < hero.weaponData.length; i++) {
            let data = hero.weaponData[i];
            ctx.drawImage(hero.weaponSpritesheet, data.x , data.y, 12, 12, x, y, 8 * PARAMS.GUI_SCALE, 8* PARAMS.GUI_SCALE);
            y -= 5.75 * spacing;
        }

    };
};

class CurrencyDisplay {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.scale = PARAMS.GUI_SCALE - 2;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/items/coin.png");
        this.animation = new AnimationGroup(this.spritesheet, 0, 0, 16, 16, 14, 0.06, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.fillStyle = ctx.strokeStyle = "Black";
        ctx.font = 10 * (this.scale - 1) + 'px "silkscreenbold"';
        ctx.fillText(saveState.currency + this.game.camera.hero.currencyCount, this.x + 16 * this.scale, this.y + 10.5 * this.scale);
        ctx.strokeText(saveState.currency + this.game.camera.hero.currencyCount, this.x + 16 * this.scale, this.y + 10.5 * this.scale);
    };
};

class RemainingEnemyDisplay {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.frameSprite = ASSET_MANAGER.getAsset("./sprites/ui/grids.png");
        this.barSprite = ASSET_MANAGER.getAsset("./sprites/ui/bars.png");
        this.barShadowSprite = ASSET_MANAGER.getAsset("./sprites/ui/bars_shadows.png");
        this.enemySprite = ASSET_MANAGER.getAsset("./sprites/ui/enemies.png");
    };

    draw(ctx) {
        ctx.drawImage(this.frameSprite, 98, 322, 12, 12, this.x, this.y, 12 * PARAMS.GUI_SCALE, 12 * PARAMS.GUI_SCALE);

        ctx.drawImage(this.barShadowSprite, 88, 53, 7, 6, this.x + 14 * PARAMS.GUI_SCALE, this.y + 3 * PARAMS.GUI_SCALE, 7 * PARAMS.GUI_SCALE, 6 * PARAMS.GUI_SCALE);
        let x = this.x + 21 * PARAMS.GUI_SCALE;
        let y = this.y + 3 * PARAMS.GUI_SCALE;
        for (let i = 0; i < 5; i++) {
            ctx.drawImage(this.barShadowSprite, 89, 53, 7, 6, x, y, 7 * PARAMS.GUI_SCALE, 6 * PARAMS.GUI_SCALE);
            x += 7 * PARAMS.GUI_SCALE;
        }
        ctx.drawImage(this.barShadowSprite, 113, 53, 7, 6, x, y, 7 * PARAMS.GUI_SCALE, 6 * PARAMS.GUI_SCALE);

        let totalEnemies = this.game.camera.totalEnemies;
        let currentEnemies = this.game.camera.countEnemies();
        let currLevel = this.game.camera.currentLevel;

        ctx.fillStyle = rgb(102, 204, 0);

        if (currLevel != druid_lair) {
            ctx.fillRect(this.x + 17 * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 43 * currentEnemies / totalEnemies * PARAMS.GUI_SCALE, 2 * PARAMS.GUI_SCALE);
        } else {
            this.game.livingEntities.forEach(entity => {
                if (entity instanceof Druid || entity instanceof DruidBird || entity instanceof DruidHound || entity instanceof DruidBeast) {
                    ctx.fillRect(this.x + 17 * PARAMS.GUI_SCALE, this.y + 5 * PARAMS.GUI_SCALE, 43 * entity.hp / Druid.maxHp * PARAMS.GUI_SCALE, 2 * PARAMS.GUI_SCALE);
                }
            })
            
        }
        
        

        ctx.drawImage(this.barSprite, 89, 54, 6, 4, this.x + 15 * PARAMS.GUI_SCALE, this.y + 4 * PARAMS.GUI_SCALE, 6 * PARAMS.GUI_SCALE, 4 * PARAMS.GUI_SCALE);
        x = this.x + 21 * PARAMS.GUI_SCALE;
        y = this.y + 4 * PARAMS.GUI_SCALE;
        for (let i = 0; i < 5; i++) {
            ctx.drawImage(this.barSprite, 96, 54, 7, 4, x, y, 7 * PARAMS.GUI_SCALE, 4 * PARAMS.GUI_SCALE);
            x += 7 * PARAMS.GUI_SCALE;
        }
        ctx.drawImage(this.barSprite, 113, 54, 6, 4, x, y, 6 * PARAMS.GUI_SCALE, 4 * PARAMS.GUI_SCALE);

        let enemyScale = PARAMS.GUI_SCALE - 2;

        switch (this.game.camera.currentLevel) {
            case plains1:
            case plains2:
                ctx.drawImage(this.enemySprite, 0, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
            case desert1:
            case desert2:
                ctx.drawImage(this.enemySprite, 32, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
            case snow1:
            case snow2:
                ctx.drawImage(this.enemySprite, 64, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
            case castle:
                ctx.drawImage(this.enemySprite, 128, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
            case druid_lair:
                ctx.drawImage(this.enemySprite, 160, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
            case swamp1:
            case swamp2:
                ctx.drawImage(this.enemySprite, 96, 0, 32, 32, this.x  + 6 * PARAMS.GUI_SCALE - 16 * enemyScale, this.y  + 7 * PARAMS.GUI_SCALE - 16 * enemyScale, 32 * enemyScale, 32 * enemyScale);
                break;
        }
    };
};