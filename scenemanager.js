class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.travelTo(titleScreen);
    };

    clearEntities() {
        this.game.heroIndex = undefined;
        this.game.entities.forEach(entity => entity.removeFromWorld = true);
    };

    loadLevel(level) {
        let isOverworld = level == overworld;
        let isTown = level == town;
        this.overworld = isOverworld;
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

                } else if (this.currentLevel == castle) {
                    this.addPropBases();
                    this.addNonCollidablePropBases();
                    this.addPropShadows();
                    this.hero = new Hero(this.game, castle.heroX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 
                        castle.heroY * PARAMS.BLOCKWIDTH * PARAMS.SCALE);
                    this.game.addEntity(this.hero);
                    this.game.addEntity(new Flame(this.game, this.hero.x, this.hero.y - 15 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 1));
                    this.addPropToppers();
                } else if (this.currentLevel == titleScreen) {
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
                    this.game.addEntity(new Portal(this.game, "Leave " + this.currentLevel.levelName, overworld, 5, this.currentLevel.cowardPortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.cowardPortal.boxWidth));
                    // leaving portal
                    this.game.addEntity(new Portal(this.game, "Complete " + this.currentLevel.levelName, overworld, this.currentLevel.portalIndex, this.currentLevel.completePortal.x * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.y * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, 2 * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxX * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxY * PARAMS.BLOCKWIDTH * PARAMS.SCALE, this.currentLevel.completePortal.boxWidth));
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
                    let pX = destination.origin.x;
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
        }
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


    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
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
     
        
    };

    travelTo(level) {
        this.currentLevel = level;
        this.loadLevel(level, level == overworld, level == town);
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};